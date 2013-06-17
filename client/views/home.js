Template.public.helpers(Meteor.userFunctions);
Template.home.helpers(Meteor.userFunctions);
Template.homeHeader.helpers(Meteor.userFunctions);
Template.homeBody.helpers(Meteor.userFunctions);

Template.home.events({
  'click #createTeam': function(event) {
    event.preventDefaults();
    Meteor.Router.to('createTeam');
  }
})


