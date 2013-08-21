Template.verifyEmail.helpers(Meteor.userFunctions);

var token;

Template.verifyEmail.created = function() {
  token = Session.get('verifyEmailToken');
  if (token) {
    Session.set('verifyEmailToken',null);
  }
};

Template.verifyEmail.rendered = function() {
  Accounts.verifyEmail(token, function(error) {
    if (error) {
      Meteor.userFunctions.addError(error.reason);
      return;
    }
    $('#confirmation').html('Your account was confirmed. log in');
    Session.set('verifyEmailToken',null);
  });
}