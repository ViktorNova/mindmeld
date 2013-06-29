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

    var oldMilestone = Milestones.findOne(milestone._id);    

    Milestones.update( { _id: milestone._id }, { $set: {
      teamId: milestone.teamId,
      projectId: milestone.projectId,
      name: milestone.name,
      detail: milestone.detail,
      code: milestone.code,
      dueDate: milestone.dueDate
    }});

    var newMilestone = Milestones.findOne(milestone._id);

    var notificationAttributes = {
      entity: 'milestone', 
      action: 'edit', 
      oldMilestone: oldMilestone,
      newMilestone: newMilestone
    };

    Meteor.call('editMilestoneNotification', notificationAttributes, function(error, notification) {
      if (error) {
        console.log(error);
        //TODO: handle errors in notifications
      }
    });

    return newMilestone;
  },
  deleteMilestone: function(milestoneId) {
    var user = Meteor.user();
    if (!user)
      throw new Meteor.Error(401, "You need to login to delete a milestone");

    Milestones.remove( { _id: milestoneId });
    Issues.remove( { milestoneId: milestoneId });
    Notifications.remove( { milestoneId: milestoneId });
  }
});
