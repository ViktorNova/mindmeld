Issues = new Meteor.Collection('issues');

Meteor.methods({
	createIssue: function(issueAttributes) {
    var user = Meteor.user();
    if (!user)
      throw new Meteor.Error(401, "You need to login to create an issue");
    //todo: validation
    //validate name to max 80 chars

    var feature = Features.findOne(issueAttributes.featureId);
    if (!feature)
      throw new Meteor.Error(500, "Feature could not be found");

    var issue = _.extend(_.pick(issueAttributes, 
      'teamId', 'projectId', 'featureId', 'issueId', 'name', 'detail', 
      'ownedByUserId', 'assignedToUserId'), {
      code: issueAttributes.name.toCode(),
      ownedByUserId: feature.ownedByUserId,
      createdByUserId: Meteor.userId(),
      ranking: 0,
      status: 0
    });

    var issueId = Issues.insert(issue);
    var issue = Issues.findOne(issueId);

    var notificationAttributes = {
      entity: 'issue',
      action: 'create',
      issue: issue
    };

    Meteor.call('createIssueNotification', notificationAttributes, function(error) {
      if (error) {
        console.log(error);
        //TODO: handle errors in notifications    
      }
    });

    return issue;
  },
  editIssue: function(issueAttributes) {
    var user = Meteor.user();
    if (!user)
      throw new Meteor.Error(401, "You need to login to edit a issue");
    //todo: validation
    //validate name to max 80 chars

    var feature = Features.findOne(issueAttributes.featureId);
    if (!feature)
      throw new Meteor.Error(500, "Feature could not be found");

    var issue = _.extend(_.pick(issueAttributes, '_id', 'teamId', 
      'projectId', 'featureId', 'name', 'detail'), {
      code: issueAttributes.name.toCode(),
      ownedByUserId: feature.ownedByUserId
    });

    var oldIssue = Issues.findOne(issue._id);

    Issues.update( { _id: issue._id }, { $set: {
      teamId: issue.teamId,
      projectId: issue.projectId,
      featureId: issue.featureId,
      name: issue.name,
      detail: issue.detail,
      code: issue.code,
      ownedByUserId: issue.ownedByUserId
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
  },
  startIssue: function(issueId) {
    var user = Meteor.user();
    if (!user)
      throw new Meteor.Error(401, "You need to login to delete a issue");
    var issue = Issues.findOne();
    if (!issue)
      throw new Meteor.Error(500, "No matching issue was found");
    var feature = Features.findOne(issue.featureId);
    if (!feature)
      throw new Meteor.Error(500, "No matching feature was found");
    if (feature.ownedByUserId != Meteor.userId())
      throw new Meteor.Error(500, "The logged in user does not own the feature, so this issue can't be started");

    var oldIssue = Issues.findOne({_id: issueId});

    Issues.update({_id: issueId}, {$set: {status: 1}});

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
  completeIssue: function(issueId) {

    var user = Meteor.user();
    if (!user)
      throw new Meteor.Error(401, "You need to login to delete a issue");
    var issue = Issues.findOne();
    if (!issue)
      throw new Meteor.Error(500, "No matching issue was found");
    var feature = Features.findOne(issue.featureId);
    if (!feature)
      throw new Meteor.Error(500, "No matching feature was found");
    if (feature.ownedByUserId != Meteor.userId())
      throw new Meteor.Error(500, "The logged in user does not own the feature, so this issue can't be completed");

    var oldIssue = Issues.findOne({_id: issueId});

    Issues.update({_id: issueId}, {$set: {status: 2}});

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
    var issue = Issues.findOne();
    if (!issue)
      throw new Meteor.Error(500, "No matching issue was found");
    var feature = Features.findOne(issue.featureId);
    if (!feature)
      throw new Meteor.Error(500, "No matching feature was found");
    if (feature.ownedByUserId != Meteor.userId())
      throw new Meteor.Error(500, "The logged in user does not own the feature, so this issue can't be cancelled");

    var oldIssue = Issues.findOne({_id: issueId});

    Issues.update({_id: issueId}, {$set: {status: 3}});

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
  }
});