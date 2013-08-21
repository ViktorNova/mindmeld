Template.emailNotVerified.helpers({
  currentEmail: function() {
    return Meteor.user() && Meteor.user().emails[0] && Meteor.user().emails[0].address;
  }
});

Template.emailNotVerified.events({
  'click #resendConfirmationEmail': function(event) {
    event.preventDefault();
    $('#waiting').show();
    $('#resendConfirmationEmail').addClass('disabled');

    Meteor.call('sendVerificationEmail', function(error) {
      if (error) {
        Meteor.userFunctions.addError(error.reason);
        return;
      }
      $('#waiting').hide();
      $('#resendConfirmationEmail').hide();
      $('#success').show();
    }); 
  }
}); 