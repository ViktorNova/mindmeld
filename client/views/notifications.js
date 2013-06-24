Template.notifications.helpers(_.extend(
  {
    notifications: function() {
      if (Meteor.Router.page() == "issue") {
        return Notifications.find({
          teamId: Session.get('currentTeamId'),
          projectId: Session.get('currentProjectId'),
          milestoneId: Session.get('currentMilestoneId'),
          issueId: Session.get('currentIssueId')
        });  
      }
    }
  },
  Meteor.userFunctions));

Template.notification.helpers({
  isIssue: function() {
    return this.entity == "issue";
  }
});

Template.issueNotification.helpers(Meteor.userFunctions);
