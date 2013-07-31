Template.createProject.helpers(Meteor.userFunctions);
Template.editProject.helpers(Meteor.userFunctions);
Template.projectForm.helpers(_.extend(_.clone(Meteor.userFunctions), Meteor.formFunctions));

Template.projectForm.events({
  'click #create': function(event) {
    event.preventDefault();

    var project = {
      teamId: $(document).find('[name=teamId]').val(),
      name: $(document).find('[name=name]').val(),
      detail: $(document).find('[name=detail]').val()
    }

    Meteor.call('createProject', project, function(error, project) {
      if (error) {
        //TODO: handle errors in notifications
        Meteor.Errors.throw(error.reason);
        //if project already exists, go there
        if (error.error == 302)
          Meteor.Router.to('team', error.details)
      } else {
        var notificationAttributes = {
          entity: 'project',
          action: 'create',
          project: project
        };

        Meteor.call('createProjectNotification', notificationAttributes, function(error) {
          if (error) {
            console.log(error);
            //TODO: handle errors in notifications    
          }
          Meteor.Router.to('project',
            Meteor.userFunctions.teamCode.call(project),
            project.code);
        });      
      }
    });
  },
  'click #edit': function(event) {
    event.preventDefault();

    var project = {
      _id: $(document).find('[name=_id]').val(),
      teamId: $(document).find('[name=teamId]').val(),
      name: $(document).find('[name=name]').val(),
      detail: $(document).find('[name=detail]').val()
    }
    console.log(project);

    Meteor.call('editProject', project, function(error, project) {
      if (error) {
        //TODO: handle errors in notifications
        Meteor.Errors.throw(error.reason);
      } else {
        Meteor.Router.to('project', 
          Meteor.userFunctions.teamCode.call(project), 
          project.code);
      }
    });
  },
  'click #cancel': function(event) {
    event.preventDefault();
    var projectId = $(document).find('[name=_id]').val();
    var project = Projects.findOne(projectId);
    Meteor.Router.to('project',
      Meteor.userFunctions.teamCode.call(project),
      project.code);
  }
});