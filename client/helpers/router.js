Router.configure({
  layout: 'layout'
});


Router.map(function() {
  this.route('home',
  {
    path: '/',
    data: function() {
      var availableTeams = Teams.find({members: {$in: [Meteor.userId()]}});
      if (availableTeams.count() == 0)
        return null;
      return {
        availableTeams: availableTeams
      };
    },
    waitOn: Meteor.subscribe('userTeams', Meteor.userId()),
    controller: LoggedInUserController,
    action: 'userLoadedAction',
    loadingTemplate: 'waiting',
    userFoundTemplate: 'home',
    userNotFoundTemplate: 'homePublic',
  });

  this.route('signIn',
  {
    path: '/signin',
    controller: SignInController,
    action: 'userLoadedAction'
  });

  this.route('signOut',
  {
    path: '/signout',
    controller: SignOutController,
    action: 'signOutAction',
    loadingTemplate: 'waiting'
  });

  this.route('signUp',
  {
    path: '/signup',
    data: function() {
      return {
        usernames: Meteor.users.find({}, {fields: { username: 1}})
      }
    },
    waitOn: Meteor.subscribe('usernames'),
    loadingTemplate: 'waiting',
    controller: SignUpController,
    action: 'userLoadedAction'
  });

  this.route('verifyEmail',
  { 
    path: '/verify-email/:emailVerificationToken',
    controller: VerifyEmailTokenController,
    action: 'verifyToken',
    loadingTemplate: 'waiting'
  });

  this.route('team',
  {
    path: '/:teamCode',
    data: function() {
      var currentTeam = Teams.findOne({code: this.params.teamCode});
      if (!currentTeam)
        return null;
      return {
        currentTeam: currentTeam,
        currentTeamCode: this.params.teamCode, 
        availableProjects: Projects.find({teamId: currentTeam._id},{sort: {statusChanged: -1}}),
        teamMembers: Meteor.users.find({_id: {$in: currentTeam.members}})
      };
    },
    waitOn: [
      Meteor.subscribe('userTeams', Meteor.userId()),
      Meteor.subscribe('userProjects', Meteor.userId()),
      Meteor.subscribe('teamMembers', Meteor.userId())
    ],
    controller: LoggedInUserController,
    action: 'userLoadedAction',
    loadingTemplate: 'waiting',
    notFoundTemplate: 'notFound',
    userFoundTemplate: 'team',
    userNotFoundTemplate: 'notFound'
  });

  this.route('createTeam',
  {
    path: '/team/create',
    data: function() {
      return {
        action: 'create',
        currentTeam: {},
        availableProjects: Projects.find({teamId: currentTeam._id},{sort: {statusChanged: -1}}),
        teamMembers: Meteor.users.find({_id: {$in: currentTeam.members}})        
      };
    },
    waitOn: [
      Meteor.subscribe('userProjects', Meteor.userId()),
      Meteor.subscribe('teamMembers', Meteor.userId())
    ],    
    controller: LoggedInUserController,
    action: 'userLoadedAction',
    loadingTemplate: 'waiting',
    notFoundTemplate: 'notFound',
    userFoundTemplate: 'createTeam',
    userNotFoundTemplate: 'notFound'    
  });

  this.route('editTeam',
  {
    path: '/:teamCode/edit',
    data: function() {
      var currentTeam = Teams.findOne({code: this.params.teamCode});
      if (!currentTeam)
        return null;
      return {
        action: 'edit',
        currentTeam: currentTeam,
        currentTeamCode: this.params.teamCode,
        availableProjects: Projects.find({teamId: currentTeam._id},{sort: {statusChanged: -1}}),
        teamMembers: Meteor.users.find({_id: {$in: currentTeam.members}})        
      };
    },
    waitOn: [
      Meteor.subscribe('userTeams', Meteor.userId()),
      Meteor.subscribe('userProjects', Meteor.userId()),
      Meteor.subscribe('teamMembers', Meteor.userId())
    ],
    controller: LoggedInUserController,
    action: 'userLoadedAction',
    loadingTemplate: 'waiting',
    notFoundTemplate: 'notFound',
    userFoundTemplate: 'editTeam',
    userNotFoundTemplate: 'notFound'
  });

  this.route('user',
  {
    path: '/users/:username',
    data: function() {
      return {};
    },
    controller: LoggedInUserController,
    action: 'userLoadedAction',
    loadingTemplate: 'waiting',
    notFoundTemplate: 'notFound',
    userFoundTemplate: 'user',
    userNotFoundTemplate: 'notFound'
  });

  this.route('createProject', 
  {
    path: '/:teamCode/project/create',
    data: function() {
      var currentTeam = Teams.findOne({code: this.params.teamCode});
      if (!currentTeam)
        return null;
      return {
        action: 'create',
        currentTeam: currentTeam,
        currentTeamCode: this.params.teamCode,
        currentProject: {teamId: currentTeam._id},
        availableProjects: Projects.find({teamId: currentTeam._id},{sort: {statusChanged: -1}}),
        teamMembers: Meteor.users.find({_id: {$in: currentTeam.members}})        
      };
    },
    waitOn: [
      Meteor.subscribe('userTeams', Meteor.userId()),
      Meteor.subscribe('userProjects', Meteor.userId()),
      Meteor.subscribe('teamMembers', Meteor.userId())
    ],
    controller: LoggedInUserController,
    action: 'userLoadedAction',
    loadingTemplate: 'waiting',
    notFoundTemplate: 'notFound',
    userFoundTemplate: 'createProject',
    userNotFoundTemplate: 'notFound'
  });

  this.route ('project', 
  { 
    path: '/:teamCode/:projectCode',
    data: function() {
      var currentTeam = Teams.findOne({code: this.params.teamCode});
      var currentProject = Projects.findOne({code: this.params.projectCode});
      if (!currentTeam || !currentProject)
        return null;

      var availableFeatures = Features.find({
          teamId: currentTeam._id,
          projectId: currentProject._id
        },
        {sort: {statusChanged: -1}}
      );

      return {
        currentTeam: currentTeam,
        currentTeamCode: this.params.teamCode,
        currentProject: currentProject,
        currentProjectCode: this.params.projectCode,
        availableFeatures: availableFeatures
      }
    },
    waitOn: [
      Meteor.subscribe('userTeams', Meteor.userId()),
      Meteor.subscribe('userProjects', Meteor.userId()),
      Meteor.subscribe('userFeatures', Meteor.userId())
    ],
    controller: LoggedInUserController,
    action: 'userLoadedAction',
    loadingTemplate: 'waiting',
    notFoundTemplate: 'notFound',
    userFoundTemplate: 'project',
    userNotFoundTemplate: 'notFound'
  });

  this.route('feature',{});

});


//   '/accept-email-invite':
//   { as: 'accept-email-invite', to: function() {
//       var qsElements = this.querystring.split('&');
//       _.each(qsElements, function(element) {
//         var pair = element.split('=');
//         if (pair[0] == 'teamInviteId' || pair[0] == 'teamInviteFromUserId')
//           Session.set(pair[0],pair[1]);
//       });

//       setCurrentIds('acceptEmailInvite',null,null,null,null,null);
//       return 'acceptEmailInvite';
//     }
//   },
//   '/:teamCode/inviteUsers': 
//   { as: 'inviteUsers', to: function(teamCode) {
//       setCurrentIds('team', teamCode, null, null, null, null);

//       if (!Meteor.user())
//         return 'notFound';

//       if (!Session.get('currentTeamId')) {
//         return 'waiting';
//       } else {
        
//         var movementAttributes = {
//           teamId: Session.get('currentTeamId'),
//           template: 'inviteUser',
//           templatePathAttributes: {teamCode: teamCode}
//         };
//         Meteor.call('logMovement',movementAttributes);

//         if (Session.get('currentTeamId') == 'NOTFOUND') {
//           return 'notFound';
//         } else {
//           return 'inviteUser';
//         }
//       }
//     }
//   },
//   '/:teamCode/tags/:tag': 
//   { as: 'tag', to: function(teamCode, tag) {
//       setCurrentIds('tag', teamCode, null, null, null, tag);

//       if (!Meteor.user())
//         return 'notFound';

//       if (!Session.get('currentTeamId')) {
//         return 'waiting';
//       } else {
//         var movementAttributes = {
//           teamId: Session.get('currentTeamId'),
//           template: 'tag',
//           templatePathAttributes: {teamCode: teamCode, tag: tag}
//         };
//         Meteor.call('logMovement', movementAttributes);

//         if (Session.get('currentTeamId') == 'NOTFOUND') {
//           return "notFound";
//         } else {
//           return 'tag';
//         }
//       }
//     }
//   },
//   '/:teamCode/project/create': 
//   { as: 'createProject', to: function(teamCode) {
//       setCurrentIds('createProject', teamCode, null, null, null, null);

//       if (!Meteor.user())
//         return 'notFound';

//       if (!Session.get('currentTeamId')) {
//         return 'waiting';
//       } else {
//         var movementAttributes = {
//           teamId: Session.get('currentTeamId'),
//           template: 'createProject',
//           templatePathAttributes: {teamCode: teamCode}
//         };
//         Meteor.call('logMovement', movementAttributes);

//         if (Session.get('currentTeamId') == 'NOTFOUND') {
//           return 'notFound';
//         } else {
//           return 'createProject';
//         }
//       }
//     }    
//   },
//   '/:teamCode/:projectCode': 
//   { as: 'project', to: function(teamCode, projectCode) {
//       setCurrentIds('project', teamCode, projectCode, null, null, null);

//       if (!Meteor.user())
//         return 'notFound';

//       if (!Session.get('currentTeamId') || !Session.get('currentProjectId')) {
//         return 'waiting';
//       } else {
//         var movementAttributes = {
//           teamId: Session.get('currentTeamId'),
//           template: 'project',
//           templatePathAttributes: {teamCode: teamCode, projectCode: projectCode}
//         };
//         Meteor.call('logMovement', movementAttributes);

//         if (Session.get('currentTeamId') == 'NOTFOUND' || Session.get('currentProjectId') == 'NOTFOUND') {
//           return 'notFound';
//         } else {
//           return 'project';
//         }
//       }
//     }    
//   },
//   '/:teamCode/:projectCode/edit': 
//   { as: 'editProject', to: function(teamCode, projectCode) {
//       setCurrentIds('editProject', teamCode, projectCode, null, null, null);

//       if (!Meteor.user())
//         return 'notFound';

//       if (!Session.get('currentTeamId') || !Session.get('currentProjectId')) {
//         return 'waiting';
//       } else {
//         var movementAttributes = {
//           teamId: Session.get('currentTeamId'),
//           template: 'editProject',
//           templatePathAttributes: {teamCode: teamCode, projectCode: projectCode}
//         };
//         Meteor.call('logMovement', movementAttributes);

//         if (Session.get('currentTeamId') == 'NOTFOUND' || Session.get('currentProjectId') == 'NOTFOUND') {
//           return 'notFound';
//         } else {
//           return 'editProject';
//         }
//       }
//     }    
//   },
//   '/:teamCode/:projectCode/feature/create': 
//   { as: 'createFeature', to: function(teamCode, projectCode) {
//       setCurrentIds('createFeature', teamCode, projectCode, null, null, null);

//       if (!Meteor.user())
//         return 'notFound';

//       if (!Session.get('currentTeamId') || !Session.get('currentProjectId')) {
//         return 'waiting';
//       } else {
//         var movementAttributes = {
//           teamId: Session.get('currentTeamId'),
//           template: 'createFeature',
//           templatePathAttributes: {teamCode: teamCode, projectCode: projectCode}
//         };
//         Meteor.call('logMovement', movementAttributes);

//         if (Session.get('currentTeamId') == 'NOTFOUND' || Session.get('currentProjectId') == 'NOTFOUND') {
//           return 'notFound';
//         } else {
//           return 'createFeature';
//         }
//       }
//     }    
//   },
//   '/:teamCode/:projectCode/:featureCode': 
//   { as: 'feature', to: function(teamCode, projectCode, featureCode) {
//       setCurrentIds('feature', teamCode, projectCode, featureCode, null, null);

//       if (!Meteor.user())
//         return 'notFound';

//       if (!Session.get('currentTeamId') || !Session.get('currentProjectId') || !Session.get('currentFeatureId')) {
//         return 'waiting';
//       } else {
//         var movementAttributes = {
//           teamId: Session.get('currentTeamId'),
//           template: 'feature',
//           templatePathAttributes: {teamCode: teamCode, projectCode: projectCode, featureCode: featureCode}
//         };
//         Meteor.call('logMovement', movementAttributes);
  
//         if (Session.get('currentTeamId') == 'NOTFOUND' || Session.get('currentProjectId') == 'NOTFOUND' || Session.get('currentFeatureId') == 'NOTFOUND') {
//           return 'notFound';
//         } else {
//           return 'feature';
//         }
//       }
//     }
//   },
//   '/:teamCode/:projectCode/:featureCode/edit': 
//   { as: 'editFeature', to: function(teamCode, projectCode, featureCode) {
//       setCurrentIds('editFeature', teamCode, projectCode, featureCode, null, null);

//       if (!Meteor.user())
//         return 'notFound';

//       if (!Session.get('currentTeamId') || !Session.get('currentProjectId') || !Session.get('currentFeatureId')) {
//         return 'waiting';
//       } else {
//         var movementAttributes = {
//           teamId: Session.get('currentTeamId'),
//           template: 'editFeature',
//           templatePathAttributes: {teamCode: teamCode, projectCode: projectCode, featureCode: featureCode}
//         };
//         Meteor.call('logMovement', movementAttributes);

//         if (Session.get('currentTeamId') == 'NOTFOUND' || Session.get('currentProjectId') == 'NOTFOUND' || Session.get('currentFeatureId') == 'NOTFOUND') {
//           return 'notFound';
//         } else {
//           return 'editFeature';
//         }
//       }
//     }    
//   },
//   '/:teamCode/:projectCode/:featureCode/issue/create': 
//   { as: 'createIssue', to: function(teamCode, projectCode, featureCode) {
//       setCurrentIds('createIssue', teamCode, projectCode, featureCode, null, null);

//       if (!Meteor.user())
//         return 'notFound';

//       if (!Session.get('currentTeamId') || !Session.get('currentProjectId') || !Session.get('currentFeatureId')) {
//         return 'waiting';
//       } else {
//         var movementAttributes = {
//           teamId: Session.get('currentTeamId'),
//           template: 'createIssue',
//           templatePathAttributes: {teamCode: teamCode, projectCode: projectCode, featureCode: featureCode}
//         };
//         Meteor.call('logMovement', movementAttributes);

//         if (Session.get('currentTeamId') == 'NOTFOUND' || Session.get('currentProjectId') == 'NOTFOUND' || Session.get('currentFeatureId') == 'NOTFOUND') {
//           return 'notFound';
//         } else {
//           return 'createIssue';
//         }
//       }
//     }    
//   },
//   '/:teamCode/:projectCode/:featureCode/:issueCode': 
//   { as: 'issue', to: function(teamCode, projectCode, featureCode, issueCode) {
//       setCurrentIds('issue', teamCode, projectCode, featureCode, issueCode, null);

//       if (!Meteor.user())
//         return 'notFound';

//       if (!Session.get('currentTeamId') || !Session.get('currentProjectId') || !Session.get('currentFeatureId') || !Session.get('currentIssueId')) {
//         return 'waiting';
//       } else {
//         var movementAttributes = {
//           teamId: Session.get('currentTeamId'),
//           template: 'issue',
//           templatePathAttributes: {teamCode: teamCode, projectCode: projectCode, featureCode: featureCode, issueCode: issueCode}
//         };
//         Meteor.call('logMovement', movementAttributes);

//         if (Session.get('currentTeamId') == 'NOTFOUND' || Session.get('currentProjectId') == 'NOTFOUND' || Session.get('currentFeatureId') == 'NOTFOUND' || Session.get('currentIssueId') == 'NOTFOUND') {
//           Meteor.call('logMovement', movementAttributes);
//           return 'notFound';
//         } else {
//           return 'issue';
//         }
//       }
//     }    
//   },
//   '/:teamCode/:projectCode/:featureCode/:issueCode/edit': 
//   { as: 'editIssue', to: function(teamCode, projectCode, featureCode, issueCode) {
//       setCurrentIds('editIssue', teamCode, projectCode, featureCode, issueCode, null);

//       if (!Meteor.user())
//         return 'notFound';

//       if (!Session.get('currentTeamId') || !Session.get('currentProjectId') || !Session.get('currentFeatureId') || !Session.get('currentIssueId')) {
//         return 'waiting';
//       } else {
//         var movementAttributes = {
//           teamId: Session.get('currentTeamId'),
//           template: 'editIssue',
//           templatePathAttributes: {teamCode: teamCode, projectCode: projectCode, featureCode: featureCode, issueCode: issueCode}
//         };
//         Meteor.call('logMovement', movementAttributes);

//         if (Session.get('currentTeamId') == 'NOTFOUND' || Session.get('currentProjectId') == 'NOTFOUND' || Session.get('currentFeatureId') == 'NOTFOUND' || Session.get('currentIssueId') == 'NOTFOUND') {
//           return 'notFound';
//         } else {
//           return 'editIssue';
//         }
//       }
//     }    
//   }
// });