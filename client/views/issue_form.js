Template.issueForm.helpers(Meteor.userFunctions);

Template.issueForm.rendered = function() {

  var ownerUserId = Meteor.userFunctions.currentIssue() && Meteor.userFunctions.currentIssue().ownerUserId;
  ownerUserId = ownerUserId || Meteor.userId();
  var assigneeUserId = Meteor.userFunctions.currentIssue() && Meteor.userFunctions.currentIssue().assigneeUserId;
  assigneeUserId = assigneeUserId || Meteor.userId();

  $(document).ready(function() {
    $("#ownerUserId").val(ownerUserId);
    $("#assigneeUserId").val(assigneeUserId);
  });
};

Template.issueForm.events({
  'click #delete': function(event) {
    event.preventDefault();

    var issueId = $(document).find('[name=_id]').val();

    Meteor.call('deleteIssue', issueId, function(error) {
      if (error) {
        Meteor.Errors.throw(error.reason);
        //TOO: handle errors in notifications
      } else {
        var milestone = Meteor.userFunctions.currentMilestone();
        Meteor.Router.to('milestone', 
          Meteor.userFunctions.teamCode.call(milestone),
          Meteor.userFunctions.projectCode.call(milestone),
          milestone.code
        );
      }
    })
  },
	'submit form': function(event) {
		event.preventDefault();

    var action = $(event.target).find('[name=action]').val();

    var issue = {
      teamId: $(event.target).find('[name=teamId]').val(),
      projectId: $(event.target).find('[name=projectId]').val(),
      milestoneId: $(event.target).find('[name=milestoneId]').val(),
      name: $(event.target).find('[name=name]').val(),
      detail: $(event.target).find('[name=detail]').val(),
      ownerUserId: $(event.target).find('[name=ownerUserId]').val(),
      assigneeUserId: $(event.target).find('[name=assigneeUserId]').val()
    }

    if (action === 'create') {
      Meteor.call('createIssue', issue, function(error, issue) {
        if (error) {
          //TODO: handle errors in notifications
          Meteor.Errors.throw(error.reason);
          //if issue already exists, go there
          if (error.error == 302)
            Meteor.Router.to('issue', error.details)
        } else {
          Meteor.Router.to('issue', 
            Meteor.userFunctions.teamCode.call(issue),
            Meteor.userFunctions.projectCode.call(issue),
            Meteor.userFunctions.milestoneCode.call(issue),
            issue.code);
        }
      });
    }

    if (action === 'edit') {
      issue._id = $(event.target).find('[name=_id]').val();

      Meteor.call('editIssue', issue, function(error, issue) {
        if (error) {
          //TODO: handle errors in notifications
          Meteor.Errors.throw(error.reason);
        } else {
          Meteor.Router.to('issue',
            Meteor.userFunctions.teamCode.call(issue),
            Meteor.userFunctions.projectCode.call(issue),
            Meteor.userFunctions.milestoneCode.call(issue),
            issue.code);
        }
      });
    }
  }
});

