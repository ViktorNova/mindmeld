Meteor.userFunctions = {
  teamCode: function() {
    return Teams.findOne(this.teamId).code;
  },
  teamName: function() {
  	return Teams.findOne(this.teamId).name;
   },
  projectCode: function() {
    return Projects.findOne(this.projectId).code;
  },
  projectName: function() {
    return Projects.findOne(this.projectId).name;
  },
  milestoneIndex: function() {
    return Milestones.findOne(this.milestoneId).index;
  },
  currentMilestone: function() {
    return Milestones.findOne(Session.get('currentMilestoneId'));
  },
  currentIssue: function() {
    return Issues.findOne(Session.get('currentIssueId'));
  },
  ownerUsername: function() {
    return Meteor.users.findOne(this.ownerUserId).username + "A";
  },
  allIssues: function() {
    return Issues.find({
      teamId: Session.get('currentTeamId'),
      projectId: Session.get('currentProjectId'),
      milestoneId: Session.get('currentMilestoneId')
    });
  },
  members: function() {
    return Meteor.users.find();
  },
  userId: function() {
    return Meteor.userId();
  }
};