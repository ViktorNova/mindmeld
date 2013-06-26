Template.projectForm.helpers(_.extend(_.clone(Meteor.userFunctions), Meteor.formFunctions));

Template.projectForm.events({
  'click #delete': function(event) {
    event.preventDefault();

    var projectId = $(document).find('[name=_id]').val();

    Meteor.call('deleteProject', projectId, function(error) {
      if (error) {
        Meteor.Errors.throw(error.reason);
        //TOO: handle errors in notifications
      } else {
        var team = Meteor.userFunctions.currentTeam();
        Meteor.Router.to('team', Meteor.userFunctions.currentTeam().code);
      }
    })
  },
  'submit form': function(event) {
    event.preventDefault();

    var action = $(event.target).find('[name=action]').val();

    var project = {
      teamId: $(event.target).find('[name=teamId]').val(),
      name: $(event.target).find('[name=name]').val(),
      detail: $(event.target).find('[name=detail]').val()
    }

    if (action === 'create') {
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
    }

    if (action === 'edit') {
      project._id = $(event.target).find('[name=_id]').val();

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
    }
  }
});