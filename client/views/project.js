Template.project.helpers(Meteor.userFunctions);
Template.createMilestone.helpers(Meteor.userFunctions);
Template.projectHeader.helpers(Meteor.userFunctions);
Template.projectBody.helpers(Meteor.userFunctions);

Template.projectBody.events({
  'click #createMilestone': function(event) {
    event.preventDefault();
    Meteor.Router.to('createMilestone', 
      Meteor.userFunctions.teamCode.call(this),
      this.code);
  }
});