Meteor.methods({
  createProject: function(projectAttributes) {
    var user = Meteor.user();
    if (!user)
      throw new Meteor.Error(401, "You need to login to create a project");

    var project = _.extend(_.pick(projectAttributes, 
      'teamId', 'name', 'detail'), {
      code: projectAttributes.name.toCode(),
      upperCaseCode: projectAttributes.name.toCode().toUpperCase(),
      createdByUserId: Meteor.userId(),
      updatedAt: new Date()
    });

    if (!Teams.findOne({_id: project.teamId, members: {$in:[Meteor.userId()]}}))
      throw new Meteor.Error(403, "The team specified could not be found");

    if (project.name.length < 3 || project.name.length > 30)
      throw new Meteor.Error(403, "Project name must be between 3 and 30 characters");

    if (project.detail.length < 3 || project.detail.length > 1000)
      throw new Meteor.Error(403, "Project description must be between 3 and 1000 characters");

    if (Projects.find({teamId: project.teamId}).count() >= 3)
      throw new Meteor.Error(403, "This team has reached the maximum number of projects. During the beta period, each team is limited to 3 projects.");

    if (Projects.findOne({teamId: project.teamId, upperCaseCode: project.upperCaseCode}))
      throw new Meteor.Error(403, "Project name already exists");

    var projectId = Projects.insert(project);
    var newProject = Projects.findOne(projectId);

    var notificationAttributes = {
      entity: 'project',
      action: 'create',
      project: newProject
    };

    Meteor.call('createProjectNotification', notificationAttributes);

    return newProject;
  },
  editProject: function(projectAttributes) {
    var user = Meteor.user();
    if (!user)
      throw new Meteor.Error(401, "You need to login to edit a project");

    var project = _.extend(_.pick(projectAttributes, '_id', 'teamId', 'name', 'detail'), {
      code: projectAttributes.name.toCode(),
      upperCaseCode: projectAttributes.name.toCode().toUpperCase()
    });

    if (!Teams.findOne({_id: project.teamId, members: {$in:[Meteor.userId()]}}))
      throw new Meteor.Error(403, "The team specified could not be found");

    if (project.name.length < 3 || project.name.length > 30)
      throw new Meteor.Error(403, "Project name must be between 3 and 30 characters");

    if (project.detail.length < 3 || project.detail.length > 1000)
      throw new Meteor.Error(403, "Project description must be between 3 and 1000 characters");

    var oldProject = Projects.findOne(project._id);    

    if (project.upperCaseCode != oldProject.upperCaseCode && Projects.findOne({teamId: project.teamId, upperCaseCode: project.upperCaseCode}))
      throw new Meteor.Error(403, "Project name already exists");

    Projects.update( { _id: project._id }, { $set: {
      teamId: project.teamId,
      projectId: project.projectId,
      name: project.name,
      detail: project.detail,
      code: project.code,
      upperCaseCode: project.upperCaseCode,
      updatedAt: new Date()
    }});

    var newProject = Projects.findOne(project._id);

    var notificationAttributes = {
      entity: 'project', 
      action: 'edit', 
      oldProject: oldProject,
      newProject: newProject
    };

    Meteor.call('editProjectNotification', notificationAttributes);

    return newProject;
  },
  deleteProject: function(projectId) {
    var user = Meteor.user();
    if (!user)
      throw new Meteor.Error(401, "You need to login to delete a project");

    var teamIdsUserBelongs = _.pluck(Teams.find({members: {$in:[Meteor.userId()]}}).fetch(),'_id');

    var validProject = Projects.findOne({_id: projectId, teamId: {$in:teamIdsUserBelongs}});

    if (!validProject)
      throw new Meteor.Error(403, "Could not find a matching project that you are authorized to delete");

    Notifications.remove({projectId: projectId});
    Comments.remove({projectId: projectId});
    Issues.remove({ projectId: projectId});
    Features.remove({projectId: projectId});
    Projects.remove({_id: projectId});
  }
});