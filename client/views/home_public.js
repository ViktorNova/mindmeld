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
      $('#subscribe').hide();
      $('#subscribed').show();
      $('#name').replaceWith('<span class="input-xlarge uneditable-input">' + $('#name').val() + '</span>');
      $('#email').replaceWith('<span class="input-xlarge uneditable-input">' + $('#email').val() + '</span>');
    }
  }
})