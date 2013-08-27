Template.userHeader.helpers(Meteor.userFunctions);

Template.userHeader.events({
  'click #signOut': function(event) {
    Meteor.logout();
  },
  'click .follow': function(event) {
    event.preventDefault();
    SessionAmplify.set('following',event.target.dataset.bind);
  }
});