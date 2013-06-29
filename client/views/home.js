Template.home.helpers(Meteor.userFunctions);
Template.homeBody.helpers(Meteor.userFunctions);

Template.home.events({
  'click #createTeam': function(event) {
    event.preventDefault();
    Meteor.Router.to('createTeam');
  }
});