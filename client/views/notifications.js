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
      var team = Teams.findOne(this.teamId);
      return {
        teamCode: team && team.code || ""
      }
    },
    asProjectParams: function() {
      var team = Teams.findOne(this.teamId);
      var project = Projects.findOne(this.projectId);
      return {
        teamCode: team && team.code || "",
        projectCode: project && project.code || ""
      }
    },
    asFeatureParams: function() {
      var team = Teams.findOne(this.teamId);
      var project = Projects.findOne(this.projectId);
      var feature = Features.findOne(this.featureId);
      return {
        teamCode: team && team.code || "",
        projectCode: project && project.code || "",
        featureCode: feature && feature.code || ""
      }
    },
    asIssueParams: function() {
      var team = Teams.findOne(this.teamId);
      var project = Projects.findOne(this.projectId);
      var feature = Features.findOne(this.featureId);
      var issue = Issues.findOne(this.issueId);
      return {
        teamCode: team && team.code || "",
        projectCode: project && project.code || "",
        featureCode: feature && feature.code || "",
        issueCode: issue && issue.code || ""
      }
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