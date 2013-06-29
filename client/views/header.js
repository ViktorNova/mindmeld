Template.header.helpers(Meteor.userFunctions);

Template.header.rendered = function() {
  $(document).ready(function() { 
    $("#following").select2(); 
    $("#following").val(Session.get('following'));
  });
};

Template.header.events({
  'click .follow': function(event) {
    event.preventDefault();
    Session.set('following',event.toElement.dataset.bind);
  }
});