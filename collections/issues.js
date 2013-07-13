Issues = new Meteor.Collection('issues');

Meteor.methods({
  getIssueId: function(issueCode) {

    if (!issueCode)
      return "NOTFOUND";

    if (! this.isSimulation) {
      var Future = Npm.require('fibers/future');
      var future = new Future();
      Meteor.setTimeout(function() {
        future.ret();
      }, 5 * 1000);
      future.wait();
    }


    console.log("looking for code " + issueCode);
    var issue = Issues.findOne({code: issueCode});
    if (issue) {
      return issue._id;
    } else {
      return "NOTFOUND";
    }
  },
	createIssue: function(issueAttributes) {
    var user = Meteor.user();
    if (!user)
      throw new Meteor.Error(401, "You need to login to create an issue");
    //todo: validation
    //validate name to max 80 chars

    var feature = Features.findOne(issueAttributes.featureId);
    if (!feature)
      throw new Meteor.Error(500, "Feature could not be found");

    var rankingCount = Issues.find({teamId: issueAttributes.teamId, projectId: issueAttributes.projectId, rank: {$exists: true}}).count();

    var issue = _.extend(_.pick(issueAttributes, 
      'teamId', 'projectId', 'featureId', 'issueId', 'name', 'detail', 'tags', 'ownedByUserId', 'assignedToUserId'), {
      code: issueAttributes.name.toCode(),
      ownedByUserId: feature.ownedByUserId,
      createdByUserId: Meteor.userId(),
      rank: rankingCount + 1,
      status: 0,
      statusChanged: new Date(),
      updatedAt: new Date()
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
      }
    });

    _.each(issue.tags, function(tag) {
      Meteor.call('tagIncrement', issue.teamId, tag);
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

    var issue = _.extend(_.pick(issueAttributes, '_id', 'teamId', 'projectId', 'featureId', 'name', 'detail', 'tags'), {
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
      tags: issue.tags,
      code: issue.code,
      ownedByUserId: issue.ownedByUserId,
      updatedAt: new Date()
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

    var addedTags = _.difference(newIssue.tags, oldIssue.tags);
    var removedTags = _.difference(oldIssue.tags, newIssue.tags);

    _.each(addedTags, function(tag) {
      Meteor.call('tagIncrement', newIssue.teamId, tag);
    });

    _.each(removedTags, function(tag) {
      Meteor.call('tagDecrement', newIssue.teamId, tag);
    });

    return newIssue;
  },
  deleteIssue: function(issueId) {
    var user = Meteor.user();
    if (!user)
      throw new Meteor.Error(401, "You need to login to delete a issue");

    var issue = Issues.findOne(issueId);
    if (!issue)
      throw new Meteor.Error(500, "Issue was not found matching that Issue Id");

    Meteor.call('removeIssueInRankings', issue, function(error) {
      if (error) {
        console.log(error);
      }
    });

    _.each(issue.tags, function(tag) {
      Meteor.call('tagDecrement',issue.teamId, issue._id, tag);
    });

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
    Issues.update({_id: issueId}, {$set: {status: 1, statusChanged: new Date()}, $unset: {rank: 1}});

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
    var issue = Issues.findOne();
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
  },
  removeIssueInRankings: function(issue) {
    var user = Meteor.user();
    if (!user)
      throw new Meteor.Error(401, "You need to login to insert an issue in rankings");

    var teamId = issue.teamId;
    if (!teamId)
      throw new Meteor.Error(500, "Issue did not have a teamId");

    var projectId = issue.projectId;
    if (!projectId)
      throw new Meteor.Error(500, "Issue did not have a projectId");

    var existingProject = IssueRankings.findOne({teamId: teamId, projectId: projectId});
    if (!existingProject)
      throw new Meteor.Error(500, "No project matching that projectId found");

    IssueRankings.update({ teamId: teamId, projectId: projectId}, {$pull: {issueIds: issue._id}});
  }
});