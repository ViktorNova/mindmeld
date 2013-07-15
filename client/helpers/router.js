function setCurrentIds(teamCode, projectCode, featureCode, issueCode, tagCode) {

  setCurrentTeamId(teamCode);
  setCurrentProjectId(projectCode);
  setCurrentFeatureId(featureCode);
  setCurrentIssueId(issueCode);
  setCurrentTagId(tagCode);
}

function setCurrentTeamId(teamCode) {
  Meteor.call('getTeamId', teamCode, function(error, result) {
    if (error) {
      console.log(error);
      Session.set('currentTeamId','NOTFOUND');
      return;
    }
    Session.set('currentTeamId', result);
  });
}

function setCurrentProjectId(projectCode) {
  Meteor.call('getProjectId', projectCode, function(error, result) {
    if (error) {
      console.log(error);
      Session.set('currentProjectId','NOTFOUND');
      return;
    }
    Session.set('currentProjectId', result);
  });
}

function setCurrentFeatureId(featureCode) {
  Meteor.call('getFeatureId', featureCode, function(error, result) {
    if (error) {
      console.log(error);
      Session.set('currentFeatureId','NOTFOUND');
      return;
    }
    Session.set('currentFeatureId', result);
  });
}

function setCurrentIssueId(issueCode) {
  Meteor.call('getIssueId', issueCode, function(error, result) {
    if (error) {
      console.log(error);
      Session.set('currentIssueId','NOTFOUND');
      return;
    }
    Session.set('currentIssueId', result);
  });
}

function setCurrentTagId(tagCode) {
  Meteor.call('getTagId', tagCode, function(error, result) {
    if (error) {
      console.log(error);
      Session.set('currentTagId','NOTFOUND');
      return;
    }
    Session.set('currentTagId', result);
  });
}

Meteor.Router.add({
  '/signIn': 
  { as: 'signIn', to: function() {
      setCurrentIds(null, null, null, null, null);
      return 'signIn';
    }
  },
'/': { as: 'home', to: function() {
      setCurrentIds(null, null, null, null, null);
      if (Meteor.user()) {
        return 'home';
      } else {
        return 'homePublic';
      }
    }
  },
  '/team/create':
    { as: 'createTeam', to: function() {
      setCurrentIds(null, null, null, null, null);
      if (Meteor.user()) {
        return 'createTeam';
      } else {
        return 'notFound';
      }
    }
  },
  '/:teamCode': { as: 'team', to: function(teamCode) {

    setCurrentIds(teamCode, null, null, null, null);

      if (!Meteor.user() || !Session.get('currentTeamId')) {
        return 'waiting';
      } else {

        var movementAttributes = {
          teamId: Session.get('currentTeamId'),
          template: 'team',
          templatePathAttributes: {teamCode: teamCode}
        };
        Meteor.call('logMovement', movementAttributes);

        if (Session.get('currentTeamId') == 'NOTFOUND') {
          return 'notFound';
        } else {
          return 'team';
        }
      }
    }
  },
  '/:teamCode/tags/:tag': { as: 'tag', to: function(teamCode, tag) {

      setCurrentIds(teamCode, null, null, null, tag);

      if (!Meteor.user() || !Session.get('currentTeamId')) {
        return 'waiting';
      } else {
        var movementAttributes = {
          teamId: Session.get('currentTeamId'),
          template: 'tag',
          templatePathAttributes: {teamCode: teamCode, tag: tag}
        };
        Meteor.call('logMovement', movementAttributes);

        if (Session.get('currentTeamId') == 'NOTFOUND') {
          return "notFound";
        } else {
          return 'tag';
        }
      }
    }
  },
  '/:teamCode/edit': { as: 'editTeam', to: function(teamCode) {
   
      setCurrentIds(teamCode, null, null, null, null);

      if (!Meteor.user() || !Session.get('currentTeamId')) {
        return 'waiting';
      } else {
        var movementAttributes = {
          teamId: Session.get('currentTeamId'),
          template: 'editTeam',
          templatePathAttributes: {teamCode: teamCode}
        };
        Meteor.call('logMovement', movementAttributes);

        if (Session.get('currentTeamId') == 'NOTFOUND') {
          return 'notFound';
        } else {
          return 'editTeam';
        }
      }
    }
  },
  '/:teamCode/project/create': { as: 'createProject', to: function(teamCode) {

      setCurrentIds(teamCode, null, null, null, null);

      if (!Meteor.user() || !Session.get('currentTeamId')) {
        return 'waiting';
      } else {
        var movementAttributes = {
          teamId: Session.get('currentTeamId'),
          template: 'createProject',
          templatePathAttributes: {teamCode: teamCode}
        };
        Meteor.call('logMovement', movementAttributes);

        if (Session.get('currentTeamId') == 'NOTFOUND') {
          return 'notFound';
        } else {
          return 'createProject';
        }
      }
    }    
  },
  '/:teamCode/:projectCode': { as: 'project', to: function(teamCode, projectCode) {

      setCurrentIds(teamCode, projectCode, null, null, null);

      if (!Meteor.user() || !Session.get('currentTeamId') || !Session.get('currentProjectId')) {
        return 'waiting';
      } else {
        var movementAttributes = {
          teamId: Session.get('currentTeamId'),
          template: 'project',
          templatePathAttributes: {teamCode: teamCode, projectCode: projectCode}
        };
        Meteor.call('logMovement', movementAttributes);


        if (Session.get('currentTeamId') == 'NOTFOUND' || Session.get('currentProjectId' == 'NOTFOUND')) {
          return 'notFound';
        } else {
          return 'project';
        }
      }
    }    
  },
  '/:teamCode/:projectCode/edit': { as: 'editProject', to: function(teamCode, projectCode) {

      setCurrentIds(teamCode, projectCode, null, null, null);

      if (!Meteor.user() || !Session.get('currentTeamId') || !Session.get('currentProjectId')) {
        return 'waiting';
      } else {
        var movementAttributes = {
          teamId: Session.get('currentTeamId'),
          template: 'editProject',
          templatePathAttributes: {teamCode: teamCode, projectCode: projectCode}
        };
        Meteor.call('logMovement', movementAttributes);

        if (Session.get('currentTeamId') == 'NOTFOUND' || Session.get('currentProjectId' == 'NOTFOUND')) {
          return 'notFound';
        } else {
          return 'editProject';
        }
      }
    }    
  },
  '/:teamCode/:projectCode/feature/create': { as: 'createFeature', to: function(teamCode, projectCode) {

      setCurrentIds(teamCode, projectCode, null, null, null);

      if (!Meteor.user() || !Session.get('currentTeamId') || !Session.get('currentProjectId')) {
        return 'waiting';
      } else {
        var movementAttributes = {
          teamId: Session.get('currentTeamId'),
          template: 'createFeature',
          templatePathAttributes: {teamCode: teamCode, projectCode: projectCode}
        };
        Meteor.call('logMovement', movementAttributes);

        if (Session.get('currentTeamId') == 'NOTFOUND' || Session.get('currentProjectId' == 'NOTFOUND')) {
          return 'notFound';
        } else {
          return 'createFeature';
        }
      }
    }    
  },
  '/:teamCode/:projectCode/:featureCode': { as: 'feature', to: function(teamCode, projectCode, featureCode) {

      setCurrentIds(teamCode, projectCode, featureCode, null, null);

      if (!Meteor.user() || !Session.get('currentTeamId') || !Session.get('currentProjectId') || !Session.get('currentFeatureId')) {
        return 'waiting';
      } else {
        var movementAttributes = {
          teamId: Session.get('currentTeamId'),
          template: 'feature',
          templatePathAttributes: {teamCode: teamCode, projectCode: projectCode, featureCode: featureCode}
        };
        Meteor.call('logMovement', movementAttributes);
  
        console.log(Session.get('currentTeamId'));
        console.log(Session.get('currentProjectId'));
        console.log(Session.get('currentFeatureId'));

        if (Session.get('currentTeamId') == 'NOTFOUND' || Session.get('currentProjectId') == 'NOTFOUND' || Session.get('currentFeatureId') == 'NOTFOUND') {
          return 'notFound';
        } else {
          return 'feature';
        }
      }
    }
  },
  '/:teamCode/:projectCode/:featureCode/edit': { as: 'editFeature', to: function(teamCode, projectCode, featureCode) {

      setCurrentIds(teamCode, projectCode, featureCode, null, null);

      if (!Meteor.user() || !Session.get('currentTeamId') || !Session.get('currentProjectId') || !Session.get('currentFeatureId')) {
        return 'waiting';
      } else {
        var movementAttributes = {
          teamId: Session.get('currentTeamId'),
          template: 'editFeature',
          templatePathAttributes: {teamCode: teamCode, projectCode: projectCode, featureCode: featureCode}
        };
        Meteor.call('logMovement', movementAttributes);

        if (Session.get('currentTeamId') == 'NOTFOUND' || Session.get('currentProjectId') == 'NOTFOUND' || Session.get('currentFeatureId') == 'NOTFOUND') {
          return 'notFound';
        } else {
          return 'editFeature';
        }
      }
    }    
  },
  '/:teamCode/:projectCode/:featureCode/issue/create': { as: 'createIssue', to: function(teamCode, projectCode, featureCode) {

      setCurrentIds(teamCode, projectCode, featureCode, null, null);

      if (!Meteor.user() || !Session.get('currentTeamId') || !Session.get('currentProjectId') || !Session.get('currentFeatureId')) {
        return 'waiting';
      } else {
        var movementAttributes = {
          teamId: Session.get('currentTeamId'),
          template: 'createIssue',
          templatePathAttributes: {teamCode: teamCode, projectCode: projectCode, featureCode: featureCode}
        };
        Meteor.call('logMovement', movementAttributes);

        if (Session.get('currentTeamId') == 'NOTFOUND' || Session.get('currentProjectId') == 'NOTFOUND' || Session.get('currentFeatureId') == 'NOTFOUND') {
          return 'notFound';
        } else {
          return 'createIssue';
        }
      }
    }    
  },
  '/:teamCode/:projectCode/:featureCode/:issueCode': { as: 'issue', to: function(teamCode, projectCode, featureCode, issueCode) {

      setCurrentIds(teamCode, projectCode, featureCode, issueCode, null);

      if (!Meteor.user() || !Session.get('currentTeamId') || !Session.get('currentProjectId') || !Session.get('currentFeatureId') || !Session.get('currentIssueId')) {
        return 'waiting';
      } else {
        var movementAttributes = {
          teamId: Session.get('currentTeamId'),
          template: 'issue',
          templatePathAttributes: {teamCode: teamCode, projectCode: projectCode, featureCode: featureCode, issueCode: issueCode}
        };
        Meteor.call('logMovement', movementAttributes);

        if (Session.get('currentTeamId') == 'NOTFOUND' || Session.get('currentProjectId') == 'NOTFOUND' || Session.get('currentFeatureId') == 'NOTFOUND' || Session.get('currentIssueId') == 'NOTFOUND') {
          Meteor.call('logMovement', movementAttributes);
          return 'notFound';
        } else {
          return 'issue';
        }
      }
    }    
  },
  '/:teamCode/:projectCode/:featureCode/:issueCode/edit': { as: 'editIssue', to: function(teamCode, projectCode, featureCode, issueCode) {

      setCurrentIds(teamCode, projectCode, featureCode, issueCode, null);

      if (!Meteor.user() || !Session.get('currentTeamId') || !Session.get('currentProjectId') || !Session.get('currentFeatureId') || !Session.get('currentIssueId')) {
        return 'waiting';
      } else {
        var movementAttributes = {
          teamId: Session.get('currentTeamId'),
          template: 'editIssue',
          templatePathAttributes: {teamCode: teamCode, projectCode: projectCode, featureCode: featureCode, issueCode: issueCode}
        };
        Meteor.call('logMovement', movementAttributes);

        if (Session.get('currentTeamId') == 'NOTFOUND' || Session.get('currentProjectId') == 'NOTFOUND' || Session.get('currentFeatureId') == 'NOTFOUND' || Session.get('currentIssueId') == 'NOTFOUND') {
          return 'notFound';
        } else {
          return 'editIssue';
        }
      }
    }    
  }
});