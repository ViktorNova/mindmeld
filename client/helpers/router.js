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

function setSession(session) {
  Session.set('currentTeamId', 
    session.teamCode && Teams.findOne({code: session.teamCode})._id);
  Session.set('currentProjectId',
    session.projectCode && Projects.findOne({code: session.projectCode})._id);
  Session.set('currentMilestoneId',
    session.milestoneCode && Milestones.findOne({code: session.milestoneCode})._id);
  Session.set('currentIssueId',
    session.issueCode && Issues.findOne({code: session.issueCode})._id);
}

Meteor.Router.add({
  '/': { as: 'home', to: function() {
      setSession({});
      if (Meteor.user()) {
        return 'home';
      } else {
        return 'homePublic';
      }
    }
  },
  '/team/create':
    { as: 'createTeam', to: function() {
      setSession({});
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
        setSession({teamCode: teamCode});
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
        setSession({teamCode: teamCode});
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
        setSession({teamCode: teamCode});
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
        setSession({teamCode: teamCode, projectCode: projectCode});
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
        setSession({teamCode: teamCode, projectCode: projectCode});
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
        setSession({teamCode: teamCode, projectCode: projectCode});
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
        setSession({teamCode: teamCode, projectCode: projectCode, milestoneCode: milestoneCode});
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
        setSession({teamCode: teamCode, projectCode: projectCode, milestoneCode: milestoneCode});
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
        setSession({teamCode: teamCode, projectCode: projectCode, milestoneCode: milestoneCode});
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
        setSession({teamCode: teamCode, projectCode: projectCode, milestoneCode: milestoneCode, issueCode: issueCode});
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
        setSession({teamCode: teamCode, projectCode: projectCode, milestoneCode: milestoneCode, issueCode: issueCode});
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