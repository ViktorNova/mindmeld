Template.issueForm.helpers(Meteor.userFunctions);

Template.issueForm.events({
	'submit form': function(event) {
		event.preventDefault();

    var issue = {
      teamId: $(event.target).find('[name=teamId]').val(),
      projectId: $(event.target).find('[name=projectId]').val(),
      milestoneId: $(event.target).find('[name=milestoneId]').val(),
      name: $(event.target).find('[name=name]').val(),
      detail: $(event.target).find('[name=detail]').val(),
      ownerUserId: $(event.target).find('[name=owner]').val(),
      assigneeUserId: $(event.target).find('[name=assignee]').val()
    }

    Meteor.call('createIssue', issue, function(error, issue) {
      if (error) {
        //TODO: handle errors in notifications
        Meteor.Errors.throw(error.reason);
        //if issue already exists, go there
        if (error.error == 302)
          Meteor.Router.to('issue', error.details)
      } else {
          Meteor.Router.to('milestone', 
            Meteor.userFunctions.teamCode.call(issue),
            Meteor.userFunctions.projectCode.call(issue),
            Meteor.userFunctions.milestoneCode.call(issue));
      }
    });
  }
});