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