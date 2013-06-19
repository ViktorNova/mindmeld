function setSessionNone() {
  Session.set('currentTeamId', null);
  Session.set('currentProjectId', null);
  Session.set('currentMilestoneId', null);
  Session.set('currentIssueId', null);
}

function setSessionTeam(teamCode) {
  var team = Teams.findOne({code: teamCode});
  if (team) {
    Session.set('currentTeamId', team._id);
    Session.set('currentProjectId', null);
    Session.set('currentMilestoneId', null);
    Session.set('currentIssueId', null);
  }
};

function setSessionTeamAndProject(teamCode, projectCode) {
  var team = Teams.findOne({code: teamCode});
  if (team) {
    Session.set('currentTeamId', team._id);
    var project = Projects.findOne({teamId: team._id, code: projectCode});
    if (project) {
      Session.set('currentProjectId', project._id);
      Session.set('currentMilestoneId', null);
      Session.set('currentIssueId', null);
    }
  }
};

function setSessionTeamAndProjectAndMilestone(teamCode, projectCode, milestoneCode) {
  var team = Teams.findOne({code: teamCode});
  if (team) {
    Session.set('currentTeamId', team._id);
    var project = Projects.findOne({teamId: team._id, code: projectCode});
    if (project) {
      Session.set('currentProjectId', project._id);
      var milestone = Milestones.findOne({teamId: team._id, 
        projectId: project._id, code: milestoneCode});
      if (milestone) {
        Session.set('currentMilestoneId', milestone._id);
        Session.set('currentIssueId', null);
      }
    }
  }
};

function setSessionTeamAndProjectAndMilestoneAndIssue(teamCode, projectCode, milestoneCode, issueCode) {
  var team = Teams.findOne({code: teamCode});
  if (team) {
    Session.set('currentTeamId', team._id);
    var project = Projects.findOne({teamId: team._id, code: projectCode});
    if (project) {
      Session.set('currentProjectId', project._id);
      var milestone = Milestones.findOne({teamId: team._id, 
        projectId: project._id, code: milestoneCode});
      if (milestone) {
        Session.set('currentMilestoneId', milestone._id);
        var issue = Issues.findOne({teamId: team._id, projectId: project._id, 
          milestoneId: milestone._id, code: issueCode });
        if (issue) {
          Session.set('currentIssueId', issue._id); 
        }
      }
    }
  }
}

Meteor.Router.add({
  '/': 
    { to: 'home', and: setSessionNone },
  '/team/create':
    { to: 'createTeam', and: setSessionNone },

  '/:teamCode': 
    { to: 'team', and: setSessionTeam },
  '/:teamCode/edit': 
    { to: 'editTeam', and: setSessionTeam },
  '/:teamCode/project/create': 
    { to: 'createProject', and: setSessionTeam },

  '/:teamCode/:projectCode': 
    { to: 'project', and: setSessionTeamAndProject },
  '/:teamCode/:projectCode/edit':
    { to: 'editProject', and: setSessionTeamAndProject },
  '/:teamCode/:projectCode/milestone/create': 
    { to: 'createMilestone', and: setSessionTeamAndProject },

  '/:teamCode/:projectCode/:milestoneCode': 
    { to: 'milestone', and: setSessionTeamAndProjectAndMilestone },
  '/:teamCode/:projectCode/:milestoneCode/edit':
    { to: 'editMilestone', and: setSessionTeamAndProjectAndMilestone },
  '/:teamCode/:projectCode/:milestoneCode/issue/create': 
    { to: 'createIssue', and: setSessionTeamAndProjectAndMilestone },

  '/:teamCode/:projectCode/:milestoneCode/:issueCode': 
    { to: 'issue', and: setSessionTeamAndProjectAndMilestoneAndIssue },
  '/:teamCode/:projectCode/:milestoneCode/:issueCode/edit':
    { to: 'editIssue', and: setSessionTeamAndProjectAndMilestoneAndIssue }
});