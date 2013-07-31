Template.createIssue.helpers(Meteor.userFunctions);
Template.editIssue.helpers(Meteor.userFunctions);
Template.issueForm.helpers(_.extend(_.clone(Meteor.userFunctions), Meteor.formFunctions));

Template.issueForm.rendered = function() {
  var tags = _.chain(Issues.find({ teamId: Meteor.userFunctions.currentIssue().teamId, tags: {$exists: true} }).fetch())
    .pluck('tags')
    .flatten()
    .uniq()
    .value();

  $(document).ready(function() { 
    $('#tags').select2({width: "100%", tags:tags});
  });
};

Template.issueForm.events({
  'click #cancel': function(event) {
    event.preventDefault();

    var issueId = $(document).find('[name=_id]').val();
    var issue = Issues.findOne(issueId);
    Meteor.Router.to('issue',
      Meteor.userFunctions.teamCode.call(issue),
      Meteor.userFunctions.projectCode.call(issue),
      Meteor.userFunctions.featureCode.call(issue),
      issue.code);
  },
	'submit form': function(event) {
		event.preventDefault();

    var action = $(event.target).find('[name=action]').val();

    var issue = {
      teamId: $(event.target).find('[name=teamId]').val(),
      projectId: $(event.target).find('[name=projectId]').val(),
      featureId: $(event.target).find('[name=featureId]').val(),
      name: $(event.target).find('[name=name]').val(),
      detail: $(event.target).find('[name=detail]').val(),
      tags: _.reject($(event.target).find('[name=tags]').val().split(','), function(tag) { return tag.trim() == ''})
    };

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
            Meteor.userFunctions.featureCode.call(issue),
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
            Meteor.userFunctions.featureCode.call(issue),
            issue.code);
        }
      });
    }
  }
});

