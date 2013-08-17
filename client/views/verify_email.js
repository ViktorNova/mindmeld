Template.verifyEmail.helpers(Meteor.userFunctions);

Template.verifyEmail.rendered = function() {
  $(document).ready(function() {
    if (Session.get('verifyEmailToken')) {
      console.log("!");
      Accounts.verifyEmail(Session.get('verifyEmailToken'), function(error) {
        if (error) {
          Meteor.userFunctions.addError(error.reason);
          return;
        }
        $('#confirmation').html('Your account was confirmed. log in');
        Session.set('verifyEmailToken',null);
      });
    } else {
      $('#confirmation').html('Account confirmation could not be verified.');
    }
  });
}