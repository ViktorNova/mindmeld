// Template.createProject.helpers(Meteor.userFunctions);
// Template.editProject.helpers(Meteor.userFunctions);
// Template.projectForm.helpers(_.extend(_.clone(Meteor.userFunctions), Meteor.formFunctions));

Template.projectForm.events({
  'click #create': function(event) {
    event.preventDefault();

    if (!$('form#createProject').parsley().validate())
      return;

    var project = {
      teamId: $(document).find('[name=teamId]').val(),
      name: $(document).find('[name=name]').val(),
      detail: $(document).find('[name=detail]').val()
    }

    var dataContext = this;

    Meteor.call('createProject', project, function(error, project) {
      if (error) {
        Meteor.userFunctions.addError(error.reason);
        return;
      } else {
        Router.go('project', {teamCode: dataContext.currentTeamCode, projectCode: project.code});
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

    var dataContext = this;

    Meteor.call('editProject', project, function(error, project) {
      if (error) {
        Meteor.userFunctions.addError(error.reason);
        return;
      } else {
        Router.go('project', {teamCode: dataContext.currentTeamCode, projectCode: project.code});
      }
    });
  },
  'click #cancel-create': function(event) {
    event.preventDefault();
    console.log(this);
    console.log("?" + this.currentTeamCode);
    Router.go('team', {teamCode: this.currentTeamCode});
  },
  'click #cancel-edit': function(event) {
    event.preventDefault();
    Router.go('project', {teamCode: this.currentTeamCode, projectCode: this.currentProjectCode});
  }
});