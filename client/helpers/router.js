Meteor.Router.add({
  '/': {
    to: 'home',
    and: function() {
    }
  },
  '/:teamCode': {
    to: 'team',
    and: function(teamCode) { 
      var team = Teams.findOne({code: teamCode});
      if (team) {
        Session.set('currentTeamId', team._id);
      }
    }
  },
  '/:teamCode/:projectCode': {
    to: 'project',
    and: function(teamCode, projectCode) { 
      var team = Teams.findOne({code: teamCode});
      if (team) {
        Session.set('currentTeamId', team._id);
        var project = Projects.findOne({teamId: team._id, code: projectCode});
        if (project) {
          Session.set('currentProjectId', project._id);
        }
      }
    }
  },
  '/:teamCode/:projectCode/:milestoneIndex': {
    to: 'milestone',
    and: function(teamCode, projectCode, milestoneIndex) {
      var team = Teams.findOne({code: teamCode});
      if (team) {
        Session.set('currentTeamId', team._id);
        var project = Projects.findOne({teamId: team._id, code: projectCode});
        if (project) {
          Session.set('currentProjectId', project._id);
          var milestone = Milestones.findOne({teamId: team._id, 
            projectId: project._id, index: parseInt(milestoneIndex)});
          if (milestone) {
            Session.set('currentMilestoneId', milestone._id);
          }
        }
      }
    }
  },
  '/:teamCode/:projectCode/:milestoneIndex/:issueCode': {
    to: 'issue',
    and: function(teamCode, projectCode, milestoneIndex, issueCode) {
      var team = Teams.findOne({code: teamCode});
      if (team) {
        Session.set('currentTeamId', team._id);
        var project = Projects.findOne({teamId: team._id, code: projectCode});
        if (project) {
          Session.set('currentProjectId', project._id);
          var milestone = Milestones.findOne({teamId: team._id, 
            projectId: project._id, index: parseInt(milestoneIndex)});
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
  }
});
