Projects = new Meteor.Collection('projects');

Meteor.methods({
  createProject: function(projectAttributes) {
    var user = Meteor.user();
    if (!user)
      throw new Meteor.Error(401, "You need to login to create a project");
    //todo: validation
    //validate name to max 80 chars

    var project = _.extend(_.pick(projectAttributes, 
      'teamId', 'name', 'detail'), {
      code: projectAttributes.name.toCode(),
      createdByUserId: Meteor.userId()
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

    var project = _.extend(_.pick(projectAttributes, '_id', 'name', 'detail'), {
      code: projectAttributes.name.toCode(),
    });

    Projects.update( { _id: project._id }, { $set: {
      name: project.name,
      detail: project.detail,
      code: project.code
    }});
    return Projects.findOne(project._id);
  },
  deleteProject: function(projectId) {
    var user = Meteor.user();
    if (!user)
      throw new Meteor.Error(401, "You need to login to delete a project");

    Projects.remove( { _id: projectId });
    Milestones.remove( { projectId: projectId });
    Issues.remove( { projectId: projectId });
  }
});