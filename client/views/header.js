Template.header.helpers(Meteor.userFunctions);

Template.header.events({
  'click #signOut': function(event) {
    Meteor.logout();
  },
  'click .follow': function(event) {
    event.preventDefault();
    Session.set('following',event.toElement.dataset.bind);
  }
});