Template.issue.helpers(Meteor.userFunctions);
Template.issueBody.helpers(Meteor.userFunctions);
Template.issueButtons.helpers(Meteor.userFunctions);
Template.blankLinks.helpers(Meteor.userFunctions);

var dataContext;

Template.issueBody.rendered = function() {
  dataContext = this;
}

Template.issueBody.events({
  'click #startIssue': function(event) {
    event.preventDefault();
    var issueId = $(document).find('[name=_id]').val();

    Meteor.call('startIssue', issueId);

    var projectIssues = Issues.find({ 
      teamId: Session.get('currentTeamId'), 
      projectId: Session.get('currentProjectId'), 
      status: 0, 
      rank: {$exists: true} },
    {sort: {rank: 1}});

    var projectIssueIds = _.pluck(projectIssues.fetch(), '_id');
    Meteor.call('reorderIssueRankings', projectIssueIds, dataContext.data.currentTeam._id, dataContext.data.currentProject._id);
  },
  'click #deleteIssue': function(event) {
    event.preventDefault();

    var issueId = $(document).find('[name=_id]').val();

    Meteor.call('deleteIssue', issueId, function(error) {
      if (error) {
        Meteor.userFunctions.addError(error.reason);
        return;
      } else {
        Router.go('feature', {
          teamCode: dataContext.data.teamCode,
          projectCode: dataContext.data.projectCode,
          featureCode: dataContext.data.featureCode
        });
      }
    })
  },
  'click #completeIssue': function(event) {
    event.preventDefault();
    var issueId = $(document).find('[name=_id]').val();
    Meteor.call('completeIssue', issueId, function(error) {
      if (error) {
        Meteor.userFunctions.addError(error.reason);
        return;
      }
    });
  },
  'click #cancelIssue': function(event) {
    event.preventDefault();
    var issueId = $(document).find('[name=_id]').val();
    Meteor.call('cancelIssue', issueId, function(error) {
      if (error) {
        Meteor.userFunctions.addError(error.reason);
        return;
      }
    });
  },
  'click #restartIssue': function(event) {
    event.preventDefault();
    var issueId = $(document).find('[name=_id]').val();
    Meteor.call('startIssue', issueId);
  },
  'click #editIssue': function(event) {
    event.preventDefault();
    Router.go('editIssue', {
      teamCode: dataContext.data.teamCode,
      projectCode: dataContext.data.projectCode,
      featureCode: dataContext.data.featureCode,
      issueCode: dataContext.data.issueCode
    });
  },
  'submit form': function(event) {
    event.preventDefault();
    var issueId = $(document).find('[name=_id]').val();  
    var comment = $(document).find('[name=newComment]').val(); 
    Meteor.call('addIssueComment', issueId, comment, function(error) {
      if (error) {
        Meteor.userFunctions.addError(error.reason);
        return;
      }
      $(document).find('[name=newComment]').val('');
    });
  },
  'click .comment-close': function(event) {
    event.preventDefault();
    var commentId = event.target.dataset.item;
    Meteor.call('removeIssueComment', commentId);
  }
})