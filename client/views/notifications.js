Template.notifications.helpers(_.extend(
  {
    notifications: function() {
      if (Meteor.Router.page() == "issue") {
        return Notifications.find(
          {
            teamId: Session.get('currentTeamId'),
            projectId: Session.get('currentProjectId'),
            milestoneId: Session.get('currentMilestoneId'),
            issueId: Session.get('currentIssueId'),
            readBy: {$nin: [ Meteor.userId() ]}
          },
          {sort: { createdAt: -1 }, reactive: true}
        );
      }
    }
  },
  Meteor.userFunctions));

Template.notification.helpers(Meteor.userFunctions);

Template.notification.events({
  'click #closeNotification': function(event) {
    event.preventDefault();
    var dismissal = {
      _id: event.srcElement.dataset.id,
      userId: Meteor.userId()
    };

    Meteor.call('dismissNotification', dismissal, function(error) {
      if (error) {
        console.log(error);
        //TOO: handle errors in notifications
      }
    });
  }
});
