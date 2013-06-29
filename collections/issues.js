Issues = new Meteor.Collection('issues');

Meteor.methods({
	createIssue: function(issueAttributes) {
    var user = Meteor.user();
    if (!user)
      throw new Meteor.Error(401, "You need to login to create an issue");
    //todo: validation
    //validate name to max 80 chars

    var issue = _.extend(_.pick(issueAttributes, 
      'teamId', 'projectId', 'featureId', 'issueId', 'name', 'detail', 
      'ownedByUserId', 'assignedToUserId'), {
      code: issueAttributes.name.toCode(),
      createdByUserId: Meteor.userId(),
      ranking: 0
    });

    var issueId = Issues.insert(issue);
    var issue = Issues.findOne(issueId);

    return issue;
  },
  editIssue: function(issueAttributes) {
    var user = Meteor.user();
    if (!user)
      throw new Meteor.Error(401, "You need to login to edit a issue");
    //todo: validation
    //validate name to max 80 chars

    var issue = _.extend(_.pick(issueAttributes, '_id', 'teamId', 
      'projectId', 'featureId', 'name', 'detail', 'ownedByUserId', 
      'assignedToUserId'), {
      code: issueAttributes.name.toCode(),
    });

    var oldIssue = Issues.findOne(issue._id);

    Issues.update( { _id: issue._id }, { $set: {
      teamId: issue.teamId,
      projectId: issue.projectId,
      featureId: issue.featureId,
      name: issue.name,
      detail: issue.detail,
      code: issue.code,
      ownedByUserId: issue.ownedByUserId,
      assignedToUserId: issue.assignedToUserId
    }});

    var newIssue = Issues.findOne(issue._id);

    var notificationAttributes = {
      entity: 'issue', 
      action: 'edit', 
      oldIssue: oldIssue,
      newIssue: newIssue
    };

    Meteor.call('editIssueNotification', notificationAttributes, function(error, notification) {
      if (error) {
        console.log(error);
        //TODO: handle errors in notifications
      }
    });

    return newIssue;
  },
  deleteIssue: function(issueId) {
    var user = Meteor.user();
    if (!user)
      throw new Meteor.Error(401, "You need to login to delete a issue");

    Notifications.remove( { issueId: issueId });
    Issues.remove( { _id: issueId });
  }
});