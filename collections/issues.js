Issues = new Meteor.Collection('issues');

Meteor.methods({
	createIssue: function(issueAttributes) {
    var user = Meteor.user();
    if (!user)
      throw new Meteor.Error(401, "You need to login to create an issue");
    //todo: validation
    //validate name to max 80 chars

    var issue = _.extend(_.pick(issueAttributes, 
      'teamId', 'projectId', 'milestoneId', 'issueId', 'name', 'detail', 
      'ownerUserId', 'assigneeUserId'), {
      code: issueAttributes.name.toCode(),
      createdByUserId: Meteor.userId(),
      ranking: 0
    });

    var issueId = Issues.insert(issue);
    return Issues.findOne(issueId);
  },
  editIssue: function(issueAttributes) {
    var user = Meteor.user();
    if (!user)
      throw new Meteor.Error(401, "You need to login to edit a issue");
    //todo: validation
    //validate name to max 80 chars

    var issue = _.extend(_.pick(issueAttributes, '_id', 'teamId', 
      'projectId', 'milestoneId', 'name', 'detail', 'ownerUserId', 
      'assigneeUserId'), {
      code: issueAttributes.name.toCode(),
    });

    Issues.update( { _id: issue._id }, { $set: {
      teamId: issue.teamId,
      projectId: issue.projectId,
      milestoneId: issue.milestoneId,
      name: issue.name,
      detail: issue.detail,
      code: issue.code,
      ownerUserId: issue.ownerUserId,
      assigneeUserId: issue.assigneeUserId
    }});
    return Issues.findOne(issue._id);
  },
  deleteIssue: function(issueId) {
    var user = Meteor.user();
    if (!user)
      throw new Meteor.Error(401, "You need to login to delete a issue");

    Issues.remove( { _id: issueId });
  }
});