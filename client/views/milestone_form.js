Template.milestoneForm.helpers(Meteor.userFunctions);

Template.milestoneForm.events({
  'submit form': function(event) {
    event.preventDefault();

    var milestone = {
      teamId: $(event.target).find('[name=teamId]').val(),
      projectId: $(event.target).find('[name=projectId]').val(),
      name: $(event.target).find('[name=name]').val(),
      detail: $(event.target).find('[name=detail]').val(),
      dueDate: moment($(event.target).find('[name=dueDate]').val())
    }

    Meteor.call('insertMilestone', milestone, function(error, milestone) {
      if (error) {
        //TODO: handle errors in notifications
        Meteor.Errors.throw(error.reason);
        //if milestone already exists, go there
        if (error.error == 302)
          Meteor.Router.to('project', error.details)
      } else {
          Meteor.Router.to('project', 
            Meteor.userFunctions.teamCode.call(milestone),
            Meteor.userFunctions.projectCode.call(milestone));
      }
    });
  }
});