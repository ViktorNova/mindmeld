Template.notifications.helpers(_.extend(
  {
    notifications: function() {
      var findParameters = {
        teamId: Session.get('currentTeamId'),
        projectId: Session.get('currentProjectId'),
        featureId: Session.get('currentFeatureId'),
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
    isTeam: function() {
      return this.entity == "team";
    },
    isProject: function() {
      return this.entity == "project";
    },
    isFeature: function() {
      return this.entity == "feature";
    },
    isIssue: function() {
      return this.entity == "issue";
    }
  },
  Meteor.userFunctions)
);