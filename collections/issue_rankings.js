IssueRankings = new Meteor.Collection('issueRankings');

Meteor.methods({
  insertIssueInRankings: function(issue) {
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

    if (existingProject) {
      var issueIds = _.toArray(existingProject.issueIds); //clone
      if (!_.contains(issueIds, issue._id))
        IssueRankings.update({ teamId: teamId, projectId: projectId}, {$push: {issueIds: issue._id}});
    } else {
      IssueRankings.insert({ teamId: teamId, projectId: projectId, issueIds: [ issue._id ]});
    }
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
  },
  updateIssuesRankings: function(updatedIssueIds, teamId, projectId) {
    var user = Meteor.user();
    if (!user)
      throw new Meteor.Error(401, "You need to login to insert an issue in rankings");

    if (!teamId)
      throw new Meteor.Error(500, "Issue did not have a teamId");

    if (!projectId)
      throw new Meteor.Error(500, "Issue did not have a projectId");

    var existingProject = IssueRankings.findOne({teamId: teamId, projectId: projectId});
    if (!existingProject)
      throw new Meteor.Error(500, "No project matching that projectId found");

    var originalIssueIds = existingProject.issueIds;

    if (_.difference(originalIssueIds, updatedIssueIds))
      throw new Meteor.Error(500, "Updated Issue Ids did not match original Issue Ids");

    IssueRankings.update({ teamId: teamId, projectId: projectId }, {$set: {issueIds: updatedIssueIds}});
  }
});