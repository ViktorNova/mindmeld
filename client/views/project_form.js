Template.projectForm.helpers(Meteor.userFunctions);

Template.projectForm.events({
  'submit form': function(event) {
    event.preventDefault();

    var project = {
      teamId: $(event.target).find('[name=teamId]').val(),
      name: $(event.target).find('[name=name]').val(),
      detail: $(event.target).find('[name=detail]').val()
    }

    Meteor.call('insertProject', project, function(error, project) {
      if (error) {
        //TODO: handle errors in notifications
        Meteor.Errors.throw(error.reason);
        //if project already exists, go there
        if (error.error == 302)
          Meteor.Router.to('team', error.details)
      } else {
          Meteor.Router.to('team',
            Meteor.userFunctions.teamCode.call(project));
      }
    });
  }
});