Template.teamForm.helpers(Meteor.userFunctions);

var dataContext;

Template.teamForm.rendered = function() {
  dataContext = this;
  $(document).ready(function() { 
    $('#name-input').focus(function() {
      $('#name-control-group').removeClass('error');
      $('#name-help-inline').html('');
    });
  });
}

Template.teamForm.events({
  'click #create': function(event) {
    event.preventDefault();

    if (!$('form#createTeam').parsley().validate())
      return;

    var team = {
      name: $(document).find('[name=name]').val(),
      detail: $(document).find('[name=detail]').val()
    }

    Meteor.call('createTeam', team, function(error, team) {
      if (error) {
        Meteor.userFunctions.addError(error.reason);
        return;
      } else {
        Router.go('team', {teamCode: team.code});
      }
    });
  },
  'click #edit': function(event) {
    event.preventDefault();

    if (!$('form#editTeam').parsley().validate())
      return;

    var team = {
      _id: $(document).find('[name=_id]').val(),
      name: $(document).find('[name=name]').val(),
      detail: $(document).find('[name=detail]').val()
    }

    Meteor.call('editTeam', team, function(error, team) {
      if (error) {
        Meteor.userFunctions.addError(error.reason);
        return;
      } else {
        Router.go('team', {teamCode: team.code});
      }
    });
  },
  'click #cancel-create': function(event) {
    event.preventDefault();
    Router.go('home');
  },
  'click #cancel-edit': function(event) {
    event.preventDefault();
    Router.go('team', {teamCode: dataContext.data.teamCode});
  }
});