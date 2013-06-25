Template.teamForm.helpers(_.extend(_.clone(Meteor.userFunctions), Meteor.formFunctions));

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

    var team = {
      name: $(event.target).find('[name=name]').val(),
      detail: $(event.target).find('[name=detail]').val()
    }

    Meteor.call('createTeam', team, function(error, team) {
      if (error) {
        //TODO: handle errors in notifications
        Meteor.Errors.throw(error.reason);
        //if team already exists, go there
        if (error.error == 302)
          Meteor.Router.to('team', error.details)
      } else {
          Meteor.Router.to('team', team.code);
      }
    });
  },
  'click #edit': function(event) {
    event.preventDefault();

    var team = {
      _id: $(event.target).find('[name=_id]').val(),
      name: $(event.target).find('[name=name]').val(),
      detail: $(event.target).find('[name=detail]').val()
    }

    Meteor.call('editTeam', team, function(error, team) {
      if (error) {
        //TODO: handle errors in notifications
        Meteor.Errors.throw(error.reason);
      } else {
        Meteor.Router.to('team', team.code);
      }
    });
  }
});