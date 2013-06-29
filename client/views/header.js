Template.header.helpers(Meteor.userFunctions);

Template.header.rendered = function() {
  $(document).ready(function() { 
    $("#following").select2(); 
    $("#following").val(Session.get('following'));
  });
};

Template.header.events({
  'click #following': function(event) {
    event.preventDefault();
    var following = $('#following>option:selected').val();
    Session.set('following', following);
  }
});