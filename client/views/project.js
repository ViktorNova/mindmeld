Template.project.helpers(Meteor.userFunctions);
Template.projectBody.helpers(Meteor.userFunctions);

Template.projectBody.events({
  'click #createFeature': function(event) {
    event.preventDefault();
    Meteor.Router.to('createFeature', 
      Meteor.userFunctions.teamCode.call(this),
      this.code);
  },
  'click #editProject': function(event) {
    event.preventDefault();
    Meteor.Router.to('editProject', 
      Meteor.userFunctions.teamCode.call(this), 
      this.code);
  }
});