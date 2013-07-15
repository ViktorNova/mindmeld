Projects = new Meteor.Collection('projects');

Meteor.methods({
  getProjectId: function(projectCode) {

    if (!projectCode)
      return null;

    if (! this.isSimulation) {
      var Future = Npm.require('fibers/future');
      var future = new Future();
      Meteor.setTimeout(function() {
        future.ret();
      }, 5 * 100);
      future.wait();
    }

    var project = Projects.findOne({code: projectCode});
    if (project) {
      return project._id;
    } else {
      return "NOTFOUND";
    }
  },
  createProject: function(projectAttributes) {
    var user = Meteor.user();
    if (!user)
      throw new Meteor.Error(401, "You need to login to create a project");
    //todo: validation
    //validate name to max 80 chars

    var project = _.extend(_.pick(projectAttributes, 
      'teamId', 'name', 'detail'), {
      code: projectAttributes.name.toCode(),
      createdByUserId: Meteor.userId(),
      updatedAt: new Date()
    });

    var projectId = Projects.insert(project);
    return Projects.findOne(projectId);
  },
  editProject: function(projectAttributes) {
    var user = Meteor.user();
    if (!user)
      throw new Meteor.Error(401, "You need to login to edit a project");
    //todo: validation
    //validate name to max 80 chars

    var project = _.extend(_.pick(projectAttributes, '_id', 'teamId', 'name', 'detail'), {
      code: projectAttributes.name.toCode(),
    });
    var oldProject = Projects.findOne(project._id);    

    Projects.update( { _id: project._id }, { $set: {
      teamId: project.teamId,
      projectId: project.projectId,
      name: project.name,
      detail: project.detail,
      code: project.code,
      updatedAt: new Date()
    }});

    var newProject = Projects.findOne(project._id);

    var notificationAttributes = {
      entity: 'project', 
      action: 'edit', 
      oldProject: oldProject,
      newProject: newProject
    };

    Meteor.call('editProjectNotification', notificationAttributes, function(error, notification) {
      if (error) {
        console.log(error);
        //TODO: handle errors in notifications
      }
    });

    return newProject;
  },
  deleteProject: function(projectId) {
    var user = Meteor.user();
    if (!user)
      throw new Meteor.Error(401, "You need to login to delete a project");

    Projects.remove( { _id: projectId });
    Features.remove( { projectId: projectId });
    Issues.remove( { projectId: projectId });
    Notifications.remove( { projectId: projectId });
  }
});