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
        issueId: issueId,
        comment: comment,
        createdAt: new Date(),
        createdByUserId: userId,
        teamId: issue.teamId
      };
      var commentId = Comments.insert(comment);
      console.log('new commentid is ' + commentId);
      return Comments.findOne(commentId);
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
    var comment = Comments.findOne({_id: commentId, teamId: {$in:userTeamIds}, createdByUserId: userId});
    if (comment) {
      Comments.remove(commentId);
    } else {
      throw new Meteor.Error(401, "You need to own the comment you want to remove");
    }
  }
})