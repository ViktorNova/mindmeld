Projects = new Meteor.Collection('projects');

Meteor.methods({
  insertProject: function(projectAttributes) {
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
  }
});