Template.createProject.helpers(Meteor.userFunctions);
Template.editProject.helpers(Meteor.userFunctions);
Template.projectForm.helpers(_.extend(_.clone(Meteor.userFunctions), Meteor.formFunctions));

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

    Meteor.call('createProject', project, function(error, project) {
      if (error) {
        Meteor.userFunctions.addError(error.reason);
        return;
      } else {
        Meteor.Router.to('project',
          Meteor.userFunctions.teamCode.call(project),
          project.code);
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
        Meteor.Router.to('project', 
          Meteor.userFunctions.teamCode.call(project), 
          project.code);
      }
    });
  },
  'click #cancel-create': function(event) {
    event.preventDefault();
    Meteor.Router.to('team', Session.get('currentTeamCode'));
  },
  'click #cancel-edit': function(event) {
    event.preventDefault();
    Meteor.Router.to('project', Session.get('currentTeamCode'), Session.get('currentProjectCode'));
  }
});