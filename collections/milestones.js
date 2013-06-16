Milestones = new Meteor.Collection('milestones');

Meteor.methods({
  insertMilestone: function(milestoneAttributes) {
    var user = Meteor.user();
    if (!user)
      throw new Meteor.Error(401, "You need to login to create a milestone");
    //todo: validation
    //validate name to max 80 chars

    var milestone = _.extend(_.pick(milestoneAttributes, 
      'teamId', 'projectId', 'name', 'detail', 'dueDate'), {
      code: milestoneAttributes.name.toCode(),
      createdByUserId: Meteor.userId()
    });

    var milestoneId = Milestones.insert(milestone);
    return Milestones.findOne(milestoneId);
  }
});
