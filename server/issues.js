Meteor.methods({
  createIssue: function(issueAttributes) {
    var user = Meteor.user();
    if (!user)
      throw new Meteor.Error(401, "You need to login to create an issue");

    var feature = Features.findOne({teamId: issueAttributes.teamId, projectId: issueAttributes.projectId, _id: issueAttributes.featureId});
    if (!feature)
      throw new Meteor.Error(403, "Feature could not be found");

    var rankingCount = Issues.find({teamId: issueAttributes.teamId, projectId: issueAttributes.projectId, rank: {$exists: true}}).count();

    var issue = _.extend(_.pick(issueAttributes, 
      'teamId', 'projectId', 'featureId', 'issueId', 'name', 'detail', 'tags', 'ownedByUserId', 'assignedToUserId'), {
      code: issueAttributes.name.toCode(),
      upperCaseCode: issueAttributes.name.toCode().toUpperCase(),
      ownedByUserId: feature.ownedByUserId,
      createdByUserId: Meteor.userId(),
      rank: rankingCount + 1,
      status: 0,
      statusChanged: new Date(),
      updatedAt: new Date()
    });
    
    if (!Teams.findOne({_id: issue.teamId, members: {$in:[Meteor.userId()]}}))
      throw new Meteor.Error(403, "The team specified could not be found");

    if (!Teams.findOne({_id: issue.teamId, members: {$in:[issue.ownedByUserId]}}))
      throw new Meteor.Error(403, "The owner specified was not found in the team specified");

    if (issue.code.length < 3)
      throw new Meteor.Error(403, "Issue name is invalid");

    if (issue.name.length < 3 || issue.name.length > 50)
      throw new Meteor.Error(403, "Issue name must be between 3 and 50 characters");

    if (issue.detail.length < 3 || issue.detail.length > 1000)
      throw new Meteor.Error(403, "Issue description must be between 3 and 1000 characters");

    if (Issues.findOne({teamId: issue.teamId, projectId: issue.projectId, featureId: issue.featureId, upperCaseCode: issue.upperCaseCode}))
      throw new Meteor.Error(403, "Issue name already exists");

    var issueId = Issues.insert(issue);
    var newIssue = Issues.findOne(issueId);

    var notificationAttributes = {
      entity: 'issue',
      action: 'create',
      issue: newIssue
    };

    Meteor.call('createIssueNotification', notificationAttributes);

    _.each(newIssue.tags, function(tag) {
      Meteor.call('tagIncrement', newIssue.teamId, tag);
    });

    return newIssue;
  },
  editIssue: function(issueAttributes) {
    var user = Meteor.user();
    if (!user)
      throw new Meteor.Error(401, "You need to login to edit a issue");

    var feature = Features.findOne({teamId: issueAttributes.teamId, projectId: issueAttributes.projectId, _id: issueAttributes.featureId});
    if (!feature)
      throw new Meteor.Error(403, "Feature could not be found");

    var issue = _.extend(_.pick(issueAttributes, '_id', 'teamId', 'projectId', 'featureId', 'name', 'detail', 'tags'), {
      code: issueAttributes.name.toCode(),
      upperCaseCode: issueAttributes.name.toCode().toUpperCase(),
      ownedByUserId: feature.ownedByUserId
    });

    if (!Teams.findOne({_id: issue.teamId, members: {$in:[Meteor.userId()]}}))
      throw new Meteor.Error(403, "The team specified could not be found");

    if (!Teams.findOne({_id: issue.teamId, members: {$in:[issue.ownedByUserId]}}))
      throw new Meteor.Error(403, "The owner specified was not found in the team specified");

    if (issue.name.length < 3 || issue.name.length > 50)
      throw new Meteor.Error(403, "Issue name must be between 3 and 50 characters");

    if (issue.detail.length < 3 || issue.detail.length > 1000)
      throw new Meteor.Error(403, "Issue description must be between 3 and 1000 characters");

    var oldIssue = Issues.findOne(issue._id);

    if (issue.upperCaseCode != oldIssue.upperCaseCode && Issues.findOne({teamId: issue.teamId, projectId: issue.projectId, featureId: issue.featureId, upperCaseCode: issue.upperCaseCode}))
      throw new Meteor.Error(403, "Issue name already exists");

    Issues.update( { _id: issue._id }, { $set: {
      teamId: issue.teamId,
      projectId: issue.projectId,
      featureId: issue.featureId,
      name: issue.name,
      detail: issue.detail,
      tags: issue.tags,
      code: issue.code,
      upperCaseCode: issue.upperCaseCode,
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

    Meteor.call('editIssueNotification', notificationAttributes);

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

    var teamIdsUserBelongs = _.pluck(Teams.find({members: {$in:[Meteor.userId()]}}).fetch(),'_id');

    var validIssue = Issues.findOne({_id: issueId, teamId: {$in:teamIdsUserBelongs}});

    if (!validIssue)
      throw new Meteor.Error(403, "Could not find a matching issue that you are authorized to delete");

    _.each(validIssue.tags, function(tag) {
      Meteor.call('tagDecrement',validIssue.teamId, tag);
    });

    Notifications.remove({issueId: issueId});
    Comments.remove({issueId: issueId})
    Issues.remove({_id: issueId});

    var relatedIssues = Issues.find({
      teamId: validIssue.teamId, 
      projectId: validIssue.projectId,
      status: 0, 
      rank: {$exists: true}
    }).fetch();

    var relatedIssueIds = _.pluck(relatedIssues,'_id');
    Meteor.call('reorderIssueRankings', relatedIssueIds, validIssue.teamId, validIssue.projectId);
  }
});
