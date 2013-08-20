Template.signUp.events = {
  'submit form': function(event) {
    event.preventDefault();
    if (!$('form#signup').parsley().validate())
      return;

    $('#signup').hide();
    $('#waiting').show();

    var signupUserAttributes = {
      username: $('#username').val(),
      password: $('#password').val(),
      firstName: $('#firstname').val(),
      lastName: $('#lastname').val(),
      email: $('#email').val(),
      showPublic: $('#showpublic').prop('checked'),
      subscribe: $('#subscribe').prop('checked')
    }

    Meteor.call('signupUser', signupUserAttributes, function(error) {
      $('#waiting').hide();
      $('#signup').show();
      if (error) {
        Meteor.userFunctions.addError(error.reason);
        return;
      }
      $('#username').prop('disabled','disabled');
      $('#password').prop('disabled','disabled');
      $('#firstname').prop('disabled','disabled');
      $('#lastname').prop('disabled','disabled');
      $('#email').prop('disabled','disabled');
      $('#showpublic').prop('disabled','disabled');
      $('#subscribe').prop('disabled','disabled');
      $('div.form-actions').replaceWith('A confirmation email has been sent to ' + signupUserAttributes.email + '. Please follow the instructions in the message to activate your account.');
    });
  }
}

Template.signUp.rendered = function() {

  $(document).ready(function() {
    $('form#signup').parsley({
      validators: {
        username: function(username) {
          if (username.length < 3)
            return true;
          return !Meteor.users.findOne({username: username});
        },
        validchars: function(username) {
          return /^[a-z0-9]{3,30}$/.test(username);
        }
      },
      messages: {
        username: "The username already exists",
        validchars: "3-30 lowercase alphanumeric characters."
      },
      successClass: 'success',
      errorClass: 'error',
      errors: {
        classHandler: function(el) {
          return $(el).closest('.control-group');
        },
        errorsWrapper: '<span class=\"help-inline\"></span>',
        errorElem: '<span></span>'
      }
    });
  });
}