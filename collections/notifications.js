Notifications = new Meteor.Collection('notifications');

function delta(oldItem, newItem) {
  var added = {};
  var removed = {};
  var changedFrom = {};
  var changedTo = {};

  var addedKeys = _.difference(_.keys(newItem), _.keys(oldItem));
  if (addedKeys) {
    added = 
      _.object(_.map(addedKeys, function(item) { return [item, newItem[item] ] }));
  }
  var removedKeys = _.difference(_.keys(oldItem), _.keys(newItem));
  if (removedKeys) {
    removed =
      _.object(_.map(removedKeys, function(item) { return [item, oldItem[item] ] }));
  }
  var sameKeys = _.intersection(_.keys(oldItem), _.keys(newItem));
  if (sameKeys) {
    _.each(sameKeys, function(sameKey) {
      if (oldItem[sameKey] !== newItem[sameKey]) {
        changedFrom[sameKey] = oldItem[sameKey];
        changedTo[sameKey] = newItem[sameKey];
      }
    });
  }

  return {
    added: added,
    removed: removed,
    changedFrom: changedFrom,
    changedTo: changedTo
  }
};

Meteor.methods({
  createIssueNotification: function(notificationAttributes) {
    var user = Meteor.user();
    if (!user)
      throw new Meteor.Error(401, "You need to login to edit an issue");
    //todo: validation

    var oldIssue = notificationAttributes.oldIssue;
    var newIssue = notificationAttributes.newIssue;

    if (oldIssue._id !== newIssue._id)
      throw new Meteor.Error(500, "Auditing error when attempting to edit an issue. Previous and new versions of id do not match");

    var issueDelta = delta(oldIssue, newIssue);

    var notification = _.extend(_.pick(notificationAttributes,
      'entity', 'action'), {
      teamId: newIssue.teamId,
      projectId: newIssue.projectId,
      milestoneId: newIssue.milestoneId,
      issueId: newIssue._id,
      name: newIssue.name,
      createdAt: new Date(),
      createdByUserId: Meteor.userId(),
      delta: issueDelta,
      readBy: []
    });

    var notificationId = Notifications.insert(notification);

    return Notifications.findOne(notificationId);
  },
  dismissNotification: function(dismissal) {
    var user = Meteor.user();
    if (!user)
      throw new Meteor.Error(401, "You need to login to edit an issue");
    //todo: validation
    Notifications.update(
      {_id: dismissal._id},
      {$push: { readBy: dismissal.userId }}
    );
  }
});