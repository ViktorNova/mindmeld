Template.createTeam.helpers(Meteor.userFunctions);
Template.editTeam.helpers(Meteor.userFunctions);
Template.teamForm.helpers(_.extend(_.clone(Meteor.userFunctions), Meteor.formFunctions));

Template.teamForm.rendered = function() {
  $(document).ready(function() { 
    $('#name-input').focus(function() {
      $('#name-control-group').removeClass('error');
      $('#name-help-inline').html('');
    });
  });
}

Template.teamForm.events({
  'click #delete': function(event) {
    event.preventDefault();

    var teamId = $(document).find('[name=_id]').val();

    Meteor.call('deleteTeam', teamId, function(error) {
      if (error) {
        Meteor.Errors.throw(error.reason);
        //TOO: handle errors in notifications
      } else {
        Meteor.Router.to('home');
      }
    })
  },
  'click #create': function(event) {
    event.preventDefault();

    if (!$('form#createTeam').parsley().validate())
      return;

    var team = {
      name: $(document).find('[name=name]').val(),
      detail: $(document).find('[name=detail]').val()
    }

    if (Meteor.userFunctions.doesTeamNameExist(team.name)) {
      $('#name-control-group').addClass('error');
      $('#name-help-inline').html('Team name already exists');
      return;
    }

    Meteor.call('createTeam', team, function(error, team) {
      if (error) {
        Meteor.userFunctions.addError(error.reason);
        return;
      } else {
        var notificationAttributes = {
          entity: 'team',
          action: 'create',
          team: team
        };

        Meteor.call('createTeamNotification', notificationAttributes, function(error) {
          if (error) {
            console.log(error);
            //TODO: handle errors in notifications    
          }
          Meteor.Router.to('team', team.code);
        });      
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

    var currentTeam = Teams.find(team._id);
    if (team.name.toCode().toUpperCase() != currentTeam.upperCaseCode) {
      if (Meteor.userFunctions.doesTeamNameExist(team.name)) {
        $('#name-control-group').addClass('error');
        $('#name-help-inline').html('Team name already exists');
        return;
      }
    }

    Meteor.call('editTeam', team, function(error, team) {
      if (error) {
        //TODO: handle errors in notifications
        Meteor.Errors.throw(error.reason);
      } else {
        Meteor.Router.to('team', team.code);
      }
    });
  },
  'click #cancel-create': function(event) {
    event.preventDefault();
    Meteor.Router.to('home');
  },
  'click #cancel-edit': function(event) {
    event.preventDefault();
    Meteor.Router.to('team', Session.get('currentTeamCode'));
  }
});