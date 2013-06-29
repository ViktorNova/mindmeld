Template.feature.helpers(Meteor.userFunctions);
Template.featureBody.helpers(Meteor.userFunctions);

Template.featureBody.events({
  'click #createIssue': function(event) {
    event.preventDefault();
    Meteor.Router.to('createIssue', 
      Meteor.userFunctions.teamCode.call(this),
      Meteor.userFunctions.projectCode.call(this),
      this.code);
  },
  'click #editFeature': function(event) {
    event.preventDefault();
    Meteor.Router.to('editFeature', 
      Meteor.userFunctions.teamCode.call(this),
      Meteor.userFunctions.projectCode.call(this),
      this.code);
  }
});