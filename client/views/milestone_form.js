Template.milestoneForm.helpers(_.extend(_.clone(Meteor.userFunctions), Meteor.formFunctions));

Template.milestoneForm.events({
  'click #create': function(event) {
    event.preventDefault();

    var milestone = {
      teamId: $(document).find('[name=teamId]').val(),
      projectId: $(document).find('[name=projectId]').val(),
      name: $(document).find('[name=name]').val(),
      detail: $(document).find('[name=detail]').val(),
      dueDate: moment($(document).find('[name=dueDate]').val()).toDate()
    }

    Meteor.call('createMilestone', milestone, function(error, milestone) {
      if (error) {
        //TODO: handle errors in notifications
        Meteor.Errors.throw(error.reason);
        //if milestone already exists, go there
        if (error.error == 302)
          Meteor.Router.to('project', error.details)
      } else {
        var notificationAttributes = {
          entity: 'milestone',
          action: 'create',
          milestone: milestone
        };

        Meteor.call('createMilestoneNotification', notificationAttributes, function(error) {
          if (error) {
            console.log(error);
            //TODO: handle errors in notifications    
          }
          Meteor.Router.to('milestone', 
            Meteor.userFunctions.teamCode.call(milestone),
            Meteor.userFunctions.projectCode.call(milestone),
            milestone.code);
        });      
      }
    });
  },
  'click #edit': function(event) {
    event.preventDefault();

    var milestone = {
      _id: $(document).find('[name=_id]').val(),
      teamId: $(document).find('[name=teamId]').val(),
      projectId: $(document).find('[name=projectId]').val(),
      name: $(document).find('[name=name]').val(),
      detail: $(document).find('[name=detail]').val(),
      dueDate: moment($(document).find('[name=dueDate]').val()).toDate()
    }

    Meteor.call('editMilestone', milestone, function(error, milestone) {
      if (error) {
        //TODO: handle errors in notifications
        Meteor.Errors.throw(error.reason);
      } else {
        Meteor.Router.to('milestone',
          Meteor.userFunctions.teamCode.call(milestone),
          Meteor.userFunctions.projectCode.call(milestone),
          milestone.code);
      }
    });
  },
  'click #delete': function(event) {
    event.preventDefault();

    var milestoneId = $(document).find('[name=_id]').val();

    Meteor.call('deleteMilestone', milestoneId, function(error) {
      if (error) {
        Meteor.Errors.throw(error.reason);
        //TOO: handle errors in notifications
      } else {
        var project = Meteor.userFunctions.currentProject();
        Meteor.Router.to('project', 
          Meteor.userFunctions.teamCode.call(project),
          project.code
        );
      }
    })
  }
});