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
  allIssues: function() {
    return Issues.find({
      teamId: Session.get('currentTeamId'),
      projectId: Session.get('currentProjectId'),
      milestoneId: Session.get('currentMilestoneId')
    });
  },
  members: function() {
    return Meteor.users.find();
    // var team = Teams.findOne(this.teamId);
    // console.log("team members" + team.members.length);
    // return Meteor.users.find({_id: {$in: team.members}});
  },
  userId: function() {
    return Meteor.userId();
  }
};