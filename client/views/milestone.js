Template.milestone.helpers(Meteor.userFunctions);
Template.createIssue.helpers(Meteor.userFunctions);
Template.milestoneHeader.helpers(Meteor.userFunctions);
Template.milestoneBody.helpers(Meteor.userFunctions);

Template.milestoneBody.events({
  'click #createIssue': function(event) {
    event.preventDefault();
    Meteor.Router.to('createIssue', 
      Meteor.userFunctions.teamCode.call(this),
      Meteor.userFunctions.projectCode.call(this),
      this.code);
  }
});