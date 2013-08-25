Template.createIssue.helpers(Meteor.userFunctions);
Template.editIssue.helpers(Meteor.userFunctions);
Template.issueForm.helpers(_.extend(_.clone(Meteor.userFunctions), Meteor.formFunctions));

var dataContext;

Template.issueForm.rendered = function() {

  dataContext = this;
  var formTags = _.pluck(dataContext.data.tags.fetch(),'tag');

  $(document).ready(function() { 
    $('#tags').select2({width: "100%", tags:formTags});
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
        Router.go('issue', {
          teamCode: dataContext.data.teamCode,
          projectCode: dataContext.data.projectCode,
          featureCode: dataContext.data.featureCode,
          issueCode: issue.code
        });
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
        Router.go('issue', {
          teamCode: dataContext.data.teamCode,
          projectCode: dataContext.data.projectCode,
          featureCode: dataContext.data.featureCode,
          issueCode: issue.code
        });
      }
    });
  },
  'click #cancel-create': function(event) {
    event.preventDefault();
    Router.go('feature', {
      teamCode: dataContext.data.teamCode,
      projectCode: dataContext.data.projectCode,
      featureCode: dataContext.data.featureCode
    });
  },
  'click #cancel-edit': function(event) {
    event.preventDefault();
    Router.go('issue', {
      teamCode: dataContext.data.teamCode,
      projectCode: dataContext.data.projectCode,
      featureCode: dataContext.data.featureCode,
      issueCode: dataContext.data.issueCode
    });
  }
});