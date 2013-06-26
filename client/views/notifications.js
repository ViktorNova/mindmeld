Template.notifications.helpers(_.extend(
  {
    notifications: function() {
      // if (!Session.get('currentTeamId') && !Session.get('currentProjectId') 
      //   && !Session.get('currentMilestoneId') && !Session.get('currentIssueId')) {
      //   return null;
      // }

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
    isTeam: function() {
      return this.entity == "team";
    },
    isProject: function() {
      return this.entity == "project";
    },
    isMilestone: function() {
      return this.entity == "milestone";
    },
    isIssue: function() {
      return this.entity == "issue";
    }
  },
  Meteor.userFunctions)
);