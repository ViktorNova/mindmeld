Comments = new Meteor.Collection('comments');

Meteor.methods({
  addIssueComment: function(issueId, comment) {
    var userId = Meteor.userId();
    if (!userId)
      throw new Meteor.Error(401, "You need to login to post an issue comment");

    var userTeams = Teams.find({members: {$in:[userId]}}).fetch();
    var userTeamIds = _.pluck(userTeams, '_id');
    var issue = Issues.findOne({_id: issueId, teamId: {$in:userTeamIds}});
    if (issue) {
      var comment = {
        teamId: issue.teamId,
        projectId: issue.projectId,
        featureId: issue.featureId,
        issueId: issueId,
        comment: comment,
        createdAt: new Date(),
        createdByUserId: userId,
      };
      var commentId = Comments.insert(comment);
      var comment = Comments.findOne(commentId);

      var notificationAttributes = {
        entity: 'comment',
        action: 'add',
        commentId: comment._id,
        issue: issue
      }
      Meteor.call('addCommentNotification', notificationAttributes);
    } else {
      throw new Meteor.Error(403, "You need to belong to the team that owns the issue in order to post an issue comment");      
    }
  },
  removeIssueComment: function(commentId) {
    var userId = Meteor.userId();
    if (!userId)
      throw new Meteor.Error(401, "You need to login to remove an issue comment");
    var userTeams = Teams.find({members: {$in:[userId]}}).fetch();
    var userTeamIds = _.pluck(userTeams, '_id');
    if (userTeamIds.length == 0)
      throw new Meteor.Error(401, "You need to belong to a team to remove an issue comment");
    var comment = Comments.findOne({_id: commentId, teamId: {$in:userTeamIds}, createdByUserId: userId});
    if (comment) {
      Comments.remove(commentId);
    } else {
      throw new Meteor.Error(404, "No comment was found matching those parameters");
    }
  }
})