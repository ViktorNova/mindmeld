Issues = new Meteor.Collection('issues');

Meteor.methods({
  startIssue: function(issueId) {
    var user = Meteor.user();
    if (!user)
      throw new Meteor.Error(401, "You need to login to delete a issue");
    var issue = Issues.findOne(issueId);
    if (!issue)
      throw new Meteor.Error(500, "No matching issue was found");
    var feature = Features.findOne(issue.featureId);
    if (!feature)
      throw new Meteor.Error(500, "No matching feature was found");
    if (feature.ownedByUserId != Meteor.userId())
      throw new Meteor.Error(500, "The logged in user does not own the feature, so this issue can't be started");

    var oldIssue = Issues.findOne({_id: issueId});
    Issues.update({_id: issueId}, {$set: {status: 1, statusChanged: new Date()}, $unset: {rank: 1}});

    var newIssue = Issues.findOne({_id: issueId});

    var notificationAttributes = {
      entity: 'issue',
      action: 'status',
      issue: newIssue,
      oldStatus: oldIssue.status,
      newStatus: newIssue.status
    };

    Meteor.call('issueStatusChangeNotification', notificationAttributes);
  },
  completeIssue: function(issueId) {

    var user = Meteor.user();
    if (!user)
      throw new Meteor.Error(401, "You need to login to delete a issue");
    var issue = Issues.findOne(issueId);
    if (!issue)
      throw new Meteor.Error(500, "No matching issue was found");
    var feature = Features.findOne(issue.featureId);
    if (!feature)
      throw new Meteor.Error(500, "No matching feature was found");
    if (feature.ownedByUserId != Meteor.userId())
      throw new Meteor.Error(500, "The logged in user does not own the feature, so this issue can't be completed");

    var oldIssue = Issues.findOne({_id: issueId});

    Issues.update({_id: issueId}, {$set: {status: 2, statusChanged: new Date()}});

    var newIssue = Issues.findOne({_id: issueId});

    var notificationAttributes = {
      entity: 'issue',
      action: 'status',
      issue: newIssue,
      oldStatus: oldIssue.status,
      newStatus: newIssue.status
    };

    Meteor.call('issueStatusChangeNotification', notificationAttributes, function(error) {
      if (error) {
        console.log(error);
        //TODO: handle errors in notifications    
      }
    });
  },
  cancelIssue: function(issueId) {
    var user = Meteor.user();
    if (!user)
      throw new Meteor.Error(401, "You need to login to delete a issue");
    var issue = Issues.findOne(issueId);
    if (!issue)
      throw new Meteor.Error(500, "No matching issue was found");
    var feature = Features.findOne(issue.featureId);
    if (!feature)
      throw new Meteor.Error(500, "No matching feature was found");
    if (feature.ownedByUserId != Meteor.userId())
      throw new Meteor.Error(500, "The logged in user does not own the feature, so this issue can't be cancelled");

    var oldIssue = Issues.findOne({_id: issueId});

    Issues.update({_id: issueId}, {$set: {status: 3, statusChanged: new Date()}});

    var newIssue = Issues.findOne({_id: issueId});

    var notificationAttributes = {
      entity: 'issue',
      action: 'status',
      issue: newIssue,
      oldStatus: oldIssue.status,
      newStatus: newIssue.status
    };

    Meteor.call('issueStatusChangeNotification', notificationAttributes, function(error) {
      if (error) {
        console.log(error);
        //TODO: handle errors in notifications    
      }
    });
  },
  reorderIssueRankings: function(issueIds, teamId, projectId) {

    var user = Meteor.user();
    if (!user)
      throw new Meteor.Error(401, "You need to login to reorder issue rankings");

    if (!teamId)
      throw new Meteor.Error(500, "Issue did not have a teamId");

    if (!projectId)
      throw new Meteor.Error(500, "Issue did not have a projectId");

    if (!issueIds)
      throw new Meteor.Error(500, "Issue Rankings were empty");

    _.each(issueIds, function(issueId, index) {
      Issues.update({teamId: teamId, projectId: projectId, _id: issueId},{$set: {rank: index + 1}});
    });
  }
});