Template.userHeader.helpers(Meteor.userFunctions);

Template.userHeader.rendered = function() {
    $(document).ready(function() {
      $(document).scrollTop(0);
    });
}

Template.publicHeader.rendered  = function() {
    $(document).ready(function() {
      $(document).scrollTop(0);
    });
}

Template.userHeader.events({
  'click #signOut': function(event) {
    SessionAmplify.set('following',null);
    Meteor.call('followUserId',null);
    Meteor.logout();
  },
  'click .follow': function(event) {
    event.preventDefault();
    SessionAmplify.set('following',event.target.dataset.bind);
    Meteor.call('followUserId',event.target.dataset.bind);
  }
});