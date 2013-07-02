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
  },
  'click .increaseRank': function(event) {
    event.preventDefault();
    Meteor.call('increaseRank', event.toElement.dataset.team, event.toElement.dataset.project, event.toElement.dataset.issue);
  },
  'click .decreaseRank': function(event) {
    event.preventDefault();
    Meteor.call('decreaseRank', event.toElement.dataset.team, event.toElement.dataset.project, event.toElement.dataset.issue);
  }
});