function setCurrentIds(templateCode, teamCode, projectCode, featureCode, issueCode, tagCode) {

  Session.set('currentTemplateCode', templateCode);

  setCurrentTeamId(templateCode, teamCode);
  setCurrentProjectId(templateCode, projectCode);
  setCurrentFeatureId(templateCode, featureCode);
  setCurrentIssueId(templateCode, issueCode);
  setCurrentTagId(templateCode, tagCode);
}

function setCurrentTeamId(templateCode, teamCode) {
  if (!teamCode) {
    Session.set('currentTeamId', null);
    return;
  }
  Meteor.call('getTeamId', teamCode, function(error, result) {
    if (Session.get('currentTemplateCode') != templateCode) {
      console.log("warning: current template code " + templateCode + " does not match session template code " + Session.get('currentTemplateCode'));
      return;
    }
    if (error) {
      console.log(error);
      Session.set('currentTeamId','NOTFOUND');
      return;
    }
    Session.set('currentTeamId', result);
  });
}

function setCurrentProjectId(templateCode, projectCode) {
  if (!projectCode) {
    Session.set('currentProjectId', null);
    return;
  }
  Meteor.call('getProjectId', projectCode, function(error, result) {
    if (Session.get('currentTemplateCode') != templateCode) {
      console.log("warning: current template code " + templateCode + " does not match session template code " + Session.get('currentTemplateCode'));
      return;
    }
    if (error) {
      console.log(error);
      Session.set('currentProjectId','NOTFOUND');
      return;
    }
    Session.set('currentProjectId', result);
  });
}

function setCurrentFeatureId(templateCode, featureCode) {
  if (!featureCode) {
    Session.set('currentFeatureId');
    return;
  }
  Meteor.call('getFeatureId', featureCode, function(error, result) {
    if (Session.get('currentTemplateCode') != templateCode) {
      console.log("warning: current template code " + templateCode + " does not match session template code " + Session.get('currentTemplateCode'));
      return;
    }
    if (error) {
      console.log(error);
      Session.set('currentFeatureId','NOTFOUND');
      return;
    }
    Session.set('currentFeatureId', result);
  });
}

function setCurrentIssueId(templateCode, issueCode) {
  if (!issueCode) {
    Session.set('currentIssueId', null);
    return;
  }
  Meteor.call('getIssueId', issueCode, function(error, result) {
    if (Session.get('currentTemplateCode') != templateCode) {
      console.log("warning: current template code " + templateCode + " does not match session template code " + Session.get('currentTemplateCode'));
      return;
    }
    if (error) {
      console.log(error);
      Session.set('currentIssueId','NOTFOUND');
      return;
    }
    console.log('setting currentIssueId to ' + result);
    Session.set('currentIssueId', result);
  });
}

function setCurrentTagId(templateCode, tagCode) {
  if (!tagCode) {
    Session.set('currentTagId', null);
    return;
  }
  Meteor.call('getTagId', tagCode, function(error, result) {
    if (Session.get('currentTemplateCode') != templateCode) {
      console.log("warning: current template code " + templateCode + " does not match session template code " + Session.get('currentTemplateCode'));
      return;
    }
    if (error) {
      console.log(error);
      Session.set('currentTagId','NOTFOUND');
      return;
    }
    Session.set('currentTagId', result);
  });
}

// Meteor.Router.beforeRouting = function() {
//   Session.set('currentTeamId', "LOADING");
//   Session.set('currentProjectId', "LOADING");
//   Session.set('currentFeatureId', "LOADING");
//   Session.set('currentIssueId', "LOADING");
//   Session.set('currentTagId', "LOADING");  
// }

Meteor.Router.add({
  '/signIn': 
  { as: 'signIn', to: function() {
      setCurrentIds('signIn',null, null, null, null, null);
      return 'signIn';
    }
  },
'/': { as: 'home', to: function() {
      setCurrentIds('home',null, null, null, null, null);
      if (Meteor.user()) {
        return 'home';
      } else {
        return 'homePublic';
      }
    }
  },
  '/team/create':
    { as: 'createTeam', to: function() {
      setCurrentIds('createTeam',null, null, null, null, null);
      if (Meteor.user()) {
        return 'createTeam';
      } else {
        return 'notFound';
      }
    }
  },
  '/:teamCode': { as: 'team', to: function(teamCode) {

    setCurrentIds('team', teamCode, null, null, null, null);

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

      setCurrentIds('tag', teamCode, null, null, null, tag);

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
   
      setCurrentIds('editTeam', teamCode, null, null, null, null);

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

      setCurrentIds('createProject', teamCode, null, null, null, null);

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

      setCurrentIds('project', teamCode, projectCode, null, null, null);

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

      setCurrentIds('editProject', teamCode, projectCode, null, null, null);

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

      setCurrentIds('createFeature', teamCode, projectCode, null, null, null);

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

      setCurrentIds('feature', teamCode, projectCode, featureCode, null, null);

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

      setCurrentIds('editFeature', teamCode, projectCode, featureCode, null, null);

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

      setCurrentIds('createIssue', teamCode, projectCode, featureCode, null, null);

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

      setCurrentIds('issue', teamCode, projectCode, featureCode, issueCode, null);

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

      setCurrentIds('editIssue', teamCode, projectCode, featureCode, issueCode, null);

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