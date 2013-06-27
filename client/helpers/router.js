function findTeamId(teamCode) {
  return Teams.findOne({code: teamCode}) && Teams.findOne({code: teamCode})._id;
}

function findProjectId(projectCode) {
  return Projects.findOne({code: projectCode}) && Projects.findOne({code: projectCode})._id;
}

function findMilestoneId(milestoneCode) {
  return Milestones.findOne({code: milestoneCode}) && Milestones.findOne({code: milestoneCode})._id;
}

function findIssueId(issueCode) {
  return Issues.findOne({code: issueCode}) && Issues.findOne({code: issueCode})._id;
}

//TODO: refactor these functions into one that scans the arg list
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
  '/': { as: 'home', to: function() {
      setSessionNone();
      if (Meteor.user()) {
        return 'home';
      } else {
        return 'homePublic';
      }
    }
  },
  '/team/create':
    { as: 'createTeam', to: function() {
      setSessionNone();
      if (Meteor.user()) {
        return 'createTeam';
      } else {
        return 'notFound';
      }
    }
  },
  '/:teamCode': { as: 'team', to: function(teamCode) {
      var teamId = findTeamId(teamCode);
      if (Meteor.user() && teamId) {     
        setSessionTeam(teamCode);
        var movementAttributes = {
          teamId: teamId,
          template: 'team',
          templatePathAttributes: {teamCode: teamCode}
        };
        Meteor.call('logMovement', movementAttributes);
        return 'team';
      } else {
        return 'notFound';
      }
    }
  },
  '/:teamCode/edit': { as: 'editTeam', to: function(teamCode) {
      var teamId = findTeamId(teamCode);
      if (Meteor.user() && teamId) {
        setSessionTeam(teamCode);
        var movementAttributes = {
          teamId: teamId,
          template: 'editTeam',
          templatePathAttributes: {teamCode: teamCode}
        };
        Meteor.call('logMovement', movementAttributes);
        return 'editTeam';
      } else {
        return 'notFound';
      }
    }
  },
  '/:teamCode/project/create': { as: 'createProject', to: function(teamCode) {
      var teamId = findTeamId(teamCode);
      if (Meteor.user() && teamId) {
        setSessionTeam(teamCode);
        var movementAttributes = {
          teamId: teamId,
          template: 'createProject',
          templatePathAttributes: {teamCode: teamCode}
        };
        Meteor.call('logMovement', movementAttributes);
        return 'createProject';
      } else {
        return 'notFound';
      }
    }    
  },
  '/:teamCode/:projectCode': { as: 'project', to: function(teamCode, projectCode) {
      var teamId = findTeamId(teamCode);
      var projectId = findProjectId(projectCode);
      if (Meteor.user() && teamId && projectId) {
        setSessionTeamAndProject(teamCode, projectCode);
        var movementAttributes = {
          teamId: teamId,
          template: 'project',
          templatePathAttributes: {teamCode: teamCode, projectCode: projectCode}
        };
        Meteor.call('logMovement', movementAttributes);
        return 'project';
      } else {
        return 'notFound';
      }
    }    
  },
  '/:teamCode/:projectCode/edit': { as: 'editProject', to: function(teamCode, projectCode) {
      var teamId = findTeamId(teamCode);
      var projectId = findProjectId(projectCode);
      if (Meteor.user() && teamId && projectId) {
        setSessionTeamAndProject(teamCode, projectCode);
        var movementAttributes = {
          teamId: teamId,
          template: 'editProject',
          templatePathAttributes: {teamCode: teamCode, projectCode: projectCode}
        };
        Meteor.call('logMovement', movementAttributes);
        return 'editProject';
      } else {
        return 'notFound';
      }
    }    
  },
  '/:teamCode/:projectCode/milestone/create': { as: 'createMilestone', to: function(teamCode, projectCode) {
      var teamId = findTeamId(teamCode);
      var projectId = findProjectId(projectCode);
      if (Meteor.user() && teamId && projectId) {
        setSessionTeamAndProject(teamCode, projectCode);
        var movementAttributes = {
          teamId: teamId,
          template: 'createMilestone',
          templatePathAttributes: {teamCode: teamCode, projectCode: projectCode}
        };
        Meteor.call('logMovement', movementAttributes);
        return 'createMilestone';
      } else {
        return 'notFound';
      }
    }    
  },
  '/:teamCode/:projectCode/:milestoneCode': { as: 'milestone', to: function(teamCode, projectCode, milestoneCode) {
      var teamId = findTeamId(teamCode);
      var projectId = findProjectId(projectCode);
      var milestoneId = findMilestoneId(milestoneCode);
      if (Meteor.user() && teamId && projectId && milestoneId) {
        setSessionTeamAndProjectAndMilestone(teamCode, projectCode, milestoneCode);
        var movementAttributes = {
          teamId: teamId,
          template: 'milestone',
          templatePathAttributes: {teamCode: teamCode, projectCode: projectCode, milestoneCode: milestoneCode}
        };
        Meteor.call('logMovement', movementAttributes);
        return 'milestone';
      } else {
        return 'notFound';
      }
    }    
  },
  '/:teamCode/:projectCode/:milestoneCode/edit': { as: 'editMilestone', to: function(teamCode, projectCode, milestoneCode) {
      var teamId = findTeamId(teamCode);
      var projectId = findProjectId(projectCode);
      var milestoneId = findMilestoneId(milestoneCode);
      if (Meteor.user() && teamId && projectId && milestoneId) {
        setSessionTeamAndProjectAndMilestone(teamCode, projectCode, milestoneCode);
        var movementAttributes = {
          teamId: teamId,
          template: 'editMilestone',
          templatePathAttributes: {teamCode: teamCode, projectCode: projectCode, milestoneCode: milestoneCode}
        };
        Meteor.call('logMovement', movementAttributes);
        return 'editMilestone';
      } else {
        return 'notFound';
      }
    }    
  },
  '/:teamCode/:projectCode/:milestoneCode/issue/create': { as: 'createIssue', to: function(teamCode, projectCode, milestoneCode) {
      var teamId = findTeamId(teamCode);
      var projectId = findProjectId(projectCode);
      var milestoneId = findMilestoneId(milestoneCode);
      if (Meteor.user() && teamId && projectId && milestoneId) {
        setSessionTeamAndProjectAndMilestone(teamCode, projectCode, milestoneCode);
        var movementAttributes = {
          teamId: teamId,
          template: 'createIssue',
          templatePathAttributes: {teamCode: teamCode, projectCode: projectCode, milestoneCode: milestoneCode}
        };
        Meteor.call('logMovement', movementAttributes);
        return 'createIssue';
      } else {
        return 'notFound';
      }
    }    
  },
  '/:teamCode/:projectCode/:milestoneCode/:issueCode': { as: 'issue', to: function(teamCode, projectCode, milestoneCode, issueCode) {
      var teamId = findTeamId(teamCode);
      var projectId = findProjectId(projectCode);
      var milestoneId = findMilestoneId(milestoneCode);
      var issueId = findIssueId(issueCode);
      if (Meteor.user() && teamId && projectId && milestoneId && issueId) {
        setSessionTeamAndProjectAndMilestoneAndIssue(teamCode, projectCode, milestoneCode, issueCode);
        var movementAttributes = {
          teamId: teamId,
          template: 'issue',
          templatePathAttributes: {teamCode: teamCode, projectCode: projectCode, milestoneCode: milestoneCode, issueCode: issueCode}
        };
        Meteor.call('logMovement', movementAttributes);
        return 'issue';
      } else {
        return 'notFound';
      }
    }    
  },
  '/:teamCode/:projectCode/:milestoneCode/:issueCode/edit': { as: 'editIssue', to: function(teamCode, projectCode, milestoneCode, issueCode) {
      var teamId = findTeamId(teamCode);
      var projectId = findProjectId(projectCode);
      var milestoneId = findMilestoneId(milestoneCode);
      var issueId = findIssueId(issueCode);
      if (Meteor.user() && teamId && projectId && milestoneId && issueId) {
        setSessionTeamAndProjectAndMilestoneAndIssue(teamCode, projectCode, milestoneCode, issueCode);
        var movementAttributes = {
          teamId: teamId,
          template: 'editIssue',
          templatePathAttributes: {teamCode: teamCode, projectCode: projectCode, milestoneCode: milestoneCode, issueCode: issueCode}
        };
        Meteor.call('logMovement', movementAttributes);
        return 'editIssue';
      } else {
        return 'notFound';
      }
    }    
  }
});