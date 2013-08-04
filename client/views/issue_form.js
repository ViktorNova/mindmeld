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
	'click #create': function(event) {
		event.preventDefault();

    if (!$('form#createIssue').parsley().validate())
      return;

    var issue = {
      teamId: $(document).find('[name=teamId]').val(),
      projectId: $(document).find('[name=projectId]').val(),
      featureId: $(document).find('[name=featureId]').val(),
      name: $(document).find('[name=name]').val(),
      detail: $(document).find('[name=detail]').val(),
      tags: _.reject($(document).find('[name=tags]').val().split(','), function(tag) { return tag.trim() == ''})
    };

    Meteor.call('createIssue', issue, function(error, issue) {
      if (error) {
        Meteor.userFunctions.addError(error.reason);
        return;
      } else {
        Meteor.Router.to('issue', 
          Meteor.userFunctions.teamCode.call(issue),
          Meteor.userFunctions.projectCode.call(issue),
          Meteor.userFunctions.featureCode.call(issue),
          issue.code);
      }
    });
  },
  'click #edit': function(event) {
    event.preventDefault();

    if (!$('form#editIssue').parsley().validate())
      return;

    var issue = {
      _id: $(document).find('[name=_id]').val(),
      teamId: $(document).find('[name=teamId]').val(),
      projectId: $(document).find('[name=projectId]').val(),
      featureId: $(document).find('[name=featureId]').val(),
      name: $(document).find('[name=name]').val(),
      detail: $(document).find('[name=detail]').val(),
      tags: _.reject($(document).find('[name=tags]').val().split(','), function(tag) { return tag.trim() == ''})
    };

    Meteor.call('editIssue', issue, function(error, issue) {
      if (error) {
        Meteor.userFunctions.addError(error.reason);
        return;
      } else {
        Meteor.Router.to('issue',
          Meteor.userFunctions.teamCode.call(issue),
          Meteor.userFunctions.projectCode.call(issue),
          Meteor.userFunctions.featureCode.call(issue),
          issue.code);
      }
    });
  },
  'click #cancel-create': function(event) {
    event.preventDefault();
    Meteor.Router.to('feature', Session.get('currentTeamCode'), Session.get('currentProjectCode'), Session.get('currentFeatureCode'));
  },
  'click #cancel-edit': function(event) {
    Meteor.Router.to('issue', Session.get('currentTeamCode'), Session.get('currentProjectCode'), Session.get('currentFeatureCode'), Session.get('currentIssueCode'));
  }
});