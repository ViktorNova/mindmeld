Milestones = new Meteor.Collection('milestones');

Meteor.methods({
  createMilestone: function(milestoneAttributes) {
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

    console.log("adding" + milestone);

    var milestoneId = Milestones.insert(milestone);
    return Milestones.findOne(milestoneId);
  },
  editMilestone: function(milestoneAttributes) {
    var user = Meteor.user();
    if (!user)
      throw new Meteor.Error(401, "You need to login to edit a milestone");
    //todo: validation
    //validate name to max 80 chars

    var milestone = _.extend(_.pick(milestoneAttributes, '_id', 'teamId', 
      'projectId', 'name', 'detail', 'dueDate'), {
      code: milestoneAttributes.name.toCode(),
    });

    Milestones.update( { _id: milestone._id }, { $set: {
      teamId: milestone.teamId,
      projectId: milestone.projectId,
      name: milestone.name,
      detail: milestone.detail,
      code: milestone.code,
      dueDate: milestone.dueDate
    }});
    return Milestones.findOne(milestone._id);
  }
});
