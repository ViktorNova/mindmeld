Template.createProject.helpers(Meteor.userFunctions);
Template.editProject.helpers(Meteor.userFunctions);
Template.projectForm.helpers(Meteor.userFunctions);

var dataContext;

Template.projectForm.rendered = function() {

  dataContext = this;

}

Template.projectForm.events({
  'blur #name-input': function(event) {
    Meteor.userFunctions.logFormEdit.call(this, event, Router.current().path);
  },
  'blur #detail': function(event) {
    Meteor.userFunctions.logFormEdit.call(this, event, Router.current().path);
  },
  'click #create': function(event) {
    event.preventDefault();

    if (!$('form#createProject').parsley().validate())
      return;

    var project = {
      teamId: $(document).find('[name=teamId]').val(),
      name: $(document).find('[name=name]').val(),
      detail: $(document).find('[name=detail]').val()
    }

    Meteor.call('createProject', project, function(error, project) {
      if (error) {
        Meteor.userFunctions.addError(error.reason);
        return;
      } else {
        Router.go('project', {teamCode: dataContext.data.teamCode, projectCode: project.code});
      }
    });
  },
  'click #edit': function(event) {
    event.preventDefault();

    if (!$('form#editProject').parsley().validate())
      return;

    var project = {
      _id: $(document).find('[name=_id]').val(),
      teamId: $(document).find('[name=teamId]').val(),
      name: $(document).find('[name=name]').val(),
      detail: $(document).find('[name=detail]').val()
    }

    Meteor.call('editProject', project, function(error, project) {
      if (error) {
        Meteor.userFunctions.addError(error.reason);
        return;
      } else {
        Router.go('project', {teamCode: dataContext.data.teamCode, projectCode: project.code});
      }
    });
  },
  'click #cancel-create': function(event) {
    event.preventDefault();
    Router.go('team', {teamCode: dataContext.data.teamCode});
  },
  'click #cancel-edit': function(event) {
    event.preventDefault();
    Router.go('project', {teamCode: dataContext.data.teamCode, projectCode: dataContext.data.projectCode});
  }
});