Template.notifications.helpers(_.extend(
  {
    notifications: function() {
      var findParameters = {
        teamId: Session.get('currentTeamId'),
        projectId: Session.get('currentProjectId'),
        milestoneId: Session.get('currentMilestoneId'),
        issueId: Session.get('currentIssueId'),
        readBy: {$nin: [ Meteor.userId() ]}
      };

      return Notifications.find(_.compactObject(findParameters),
        {sort: { createdAt: -1 }, reactive: true}
      );
    }
  },
  Meteor.userFunctions));

Template.notification.helpers(_.extend(
  {
    isMilestone: function() {
      return this.entity == "milestone";
    },
    isIssue: function() {
      return this.entity == "issue";
    }
  },
  Meteor.userFunctions));

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
