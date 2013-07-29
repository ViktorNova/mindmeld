Template.issue.helpers(Meteor.userFunctions);
Template.issueBody.helpers(Meteor.userFunctions);

Template.issueBody.events({
  'click #startIssue': function(event) {
    event.preventDefault();
    var issueId = $(document).find('[name=_id]').val();

    Meteor.call('startIssue', issueId, function(error) {
      if (error) {
        Meteor.Errors.throw(error.reason);
        //TOO: handle errors in notifications
      }

      var projectIssues = Issues.find({ 
        teamId: Session.get('currentTeamId'), 
        projectId: Session.get('currentProjectId'), 
        status: 0, 
        rank: {$exists: true} },
      {sort: {rank: 1}});

      var projectIssueIds = _.pluck(projectIssues.fetch(), '_id');
      Meteor.call('reorderIssueRankings', projectIssueIds, Meteor.userFunctions.currentTeam()._id, Meteor.userFunctions.currentProject()._id);
    });
  },
  'click #completeIssue': function(event) {
    event.preventDefault();
    var issueId = $(document).find('[name=_id]').val();
    Meteor.call('completeIssue', issueId, function(error) {
      if (error) {
        Meteor.Errors.throw(error.reason);
        //TOO: handle errors in notifications
      }
    });
  },
  'click #cancelIssue': function(event) {
    event.preventDefault();
    var issueId = $(document).find('[name=_id]').val();
    Meteor.call('cancelIssue', issueId, function(error) {
      if (error) {
        Meteor.Errors.throw(error.reason);
        //TOO: handle errors in notifications
      }
    });
  },
  'click #editIssue': function(event) {
    event.preventDefault();
    Meteor.Router.to('editIssue',
      Meteor.userFunctions.teamCode.call(this),
      Meteor.userFunctions.projectCode.call(this),
      Meteor.userFunctions.featureCode.call(this),
      this.code);
  }
})