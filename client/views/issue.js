Template.issue.helpers(Meteor.userFunctions);
Template.issueBody.helpers(Meteor.userFunctions);

Template.issueBody.events({
  'click #editIssue': function(event) {
    event.preventDefault();
    Meteor.Router.to('editIssue',
      Meteor.userFunctions.teamCode.call(this),
      Meteor.userFunctions.projectCode.call(this),
      Meteor.userFunctions.milestoneCode.call(this),
      this.code);
  }
})