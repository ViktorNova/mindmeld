Template.team.helpers(Meteor.userFunctions);
Template.createProject.helpers(Meteor.userFunctions);
Template.teamHeader.helpers(Meteor.userFunctions);
Template.teamAddProject.helpers(Meteor.userFunctions);
Template.teamBody.helpers(Meteor.userFunctions);

Template.teamAddProject.events({
  'click #createProject': function(event) {
    event.preventDefault();
    Meteor.Router.to('createProject', 
      this.code);
  }
});