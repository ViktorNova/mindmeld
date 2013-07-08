Template.homePublic.helpers();

Template.homePublic.events({
  'click #subscribe': function(event) {
    event.preventDefault();

    if ($('#subscription-form').parsley().validate()) {
      var name = $(document).find('[id=name]').val();
      var email = $(document).find('[id=email]').val();
      var subscription = {
        name: name,
        email: email
      };
      Meteor.call('subscribe', subscription);
      $('#name').replaceWith('<span class="span5 uneditable-input">' + $('#name').val() + '</span>');
      $('#email').replaceWith('<span class="span5 uneditable-input">' + $('#email').val() + '</span>');
      $('#subscribe').val('Subscribed!').prop('disabled', true);
    }
  }
})