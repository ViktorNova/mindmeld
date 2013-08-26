Template.notifications.helpers(Meteor.userFunctions);

Template.notification.helpers(_.extend(
  {
    createdByUsernameParams: function() {
      return { username: this.createdByUsername}
    },
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
    },
    isComment: function() {
      return this.entity == "comment";
    },
    asTeamParams: function() {
      return {
        teamCode: Teams.findOne(this.teamId).code
      }
    },
    asProjectParams: function() {
      return {
        teamCode: Teams.findOne(this.teamId).code,
        projectCode: Projects.findOne(this.projectId).code
      }
    },
    asFeatureParams: function() {
      return {
        teamCode: Teams.findOne(this.teamId).code,
        projectCode: Projects.findOne(this.projectId).code,
        featureCode: Features.findOne(this.featureId).code
      }
    },
    asIssueParams: function() {
      return {
        teamCode: Teams.findOne(this.teamId).code,
        projectCode: Projects.findOne(this.projectId).code,
        featureCode: Features.findOne(this.featureId).code,
        issueCode: Issues.findOne(this.issueId).code
      };
    }
  },
  Meteor.userFunctions)
);

Template.notification.events({
  'click .close': function(event) {
    event.preventDefault();
    Meteor.call('dismissNotification', event.target.dataset.item);
  }
})