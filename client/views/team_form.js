Template.teamForm.helpers(Meteor.userFunctions);

Template.teamForm.events({
  'submit form': function(event) {
    event.preventDefault();

    var team = {
      name: $(event.target).find('[name=name]').val(),
      detail: $(event.target).find('[name=detail]').val()
    }

    Meteor.call('insertTeam', team, function(error, team) {
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
  }
});