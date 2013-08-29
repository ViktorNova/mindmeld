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

  this.route('acceptEmailInvite',
  {
    path: '/accept-email-invite',
    data: function() {

      var invitedTeam;
      var teamInvite = TeamInvites.findOne(this.params.teamInviteId);
      if (!teamInvite)
        invitedTeam = {};
      else 
        invitedTeam = Teams.findOne({_id: teamInvite.teamId});
      if (!invitedTeam)
        invitedTeam = {};

      return {
        invitedTeam: invitedTeam,
        teamInviteId: this.params.teamInviteId,
        teamInviteFromUserId: this.params.teamInviteFromUserId
      };
    },
    waitOn: Meteor.subscribe('teamInvites', Meteor.userId()),
    controller: AcceptEmailInviteController,
    action: 'acceptEmailInvite',
    loadingTemplate: 'waiting',
    notFoundTemplate: 'acceptEmailInvite'
  });

  this.route('team',
  {
    path: '/:teamCode',
    data: function() {
      var currentTeam = Teams.findOne({code: this.params.teamCode});
      if (!currentTeam)
        return null;
      if (currentTeam.members) {
        return {
          currentTeam: currentTeam,
          teamCode: this.params.teamCode, 
          availableProjects: Projects.find({teamId: currentTeam._id},{sort: {statusChanged: -1}}),
          teamMembers: currentTeam.members && Meteor.users.find({_id: {$in: currentTeam.members}}),
          teamMovements: Movements.find({teamId: currentTeam._id})
        };
      } else {
        return {
          publicViewOnly: true,
          currentTeam: currentTeam,
          teamCode: this.params.teamCode
        };
      }
    },
    waitOn: [
      Meteor.subscribe('userTeams', Meteor.userId()),
      Meteor.subscribe('publicTeams'),
      Meteor.subscribe('userProjects', Meteor.userId()),
      Meteor.subscribe('teamMembers', Meteor.userId()),
      Meteor.subscribe('teamMovements', Meteor.userId())
    ],
    controller: LoggedInUserController,
    action: 'userLoadedAction',
    loadingTemplate: 'waiting',
    notFoundTemplate: 'notFound',
    userFoundTemplate: 'team',
    userNotFoundTemplate: 'unauthorized'
  });

  this.route('tag',
  {
    path: '/:teamCode/tags/:tag',
    data: function() {
      var currentTeam = Teams.findOne({code: this.params.teamCode});
      if (!currentTeam || !currentTeam.members)
        return null;
      var tags = Tags.find({teamId: currentTeam._id});
      return {
        tags: tags,
        currentTeam: currentTeam,
        teamCode: this.params.teamCode,
        teamMembers: currentTeam.members && Meteor.users.find({_id: {$in: currentTeam.members}})
      };
    },
    waitOn: [
    Meteor.subscribe('userTeams', Meteor.userId()),
    Meteor.subscribe('userTags', Meteor.userId()),
    Meteor.subscribe('teamMembers', Meteor.userId())
    ],
    controller: LoggedInUserController,
    action: 'userLoadedAction',
    loadingTemplate: 'waiting',
    notFoundTemplate: 'notFound',
    userFoundTemplate: 'tag',
    userNotFoundTemplate: 'unauthorized'
  });


  this.route('createTeam',
  {
    path: '/team/create',
    data: function() {
      return {
        action: 'create',
        currentTeam: {}
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
    userNotFoundTemplate: 'unauthorized' 
  });

  this.route('editTeam',
  {
    path: '/:teamCode/edit',
    data: function() {
      var currentTeam = Teams.findOne({code: this.params.teamCode});
      if (!currentTeam || !currentTeam.members)
        return null;
      return {
        action: 'edit',
        currentTeam: currentTeam,
        teamCode: this.params.teamCode,
        availableProjects: Projects.find({teamId: currentTeam._id},{sort: {statusChanged: -1}}),
        teamMembers: currentTeam.members && Meteor.users.find({_id: {$in: currentTeam.members}})        
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
    userNotFoundTemplate: 'unauthorized'
  });

  this.route('inviteUsers',
  {
    path: '/:teamCode/inviteUsers',
    data: function() {
      var currentTeam = Teams.findOne({code: this.params.teamCode});
      if (!currentTeam || !currentTeam.members)
        return null;
      return {
        currentTeam: currentTeam,
        teamCode: this.params.teamCode, 
        availableProjects: Projects.find({teamId: currentTeam._id},{sort: {statusChanged: -1}}),
        teamMembers: currentTeam.members && Meteor.users.find({_id: {$in: currentTeam.members}})
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
    userFoundTemplate: 'inviteUser',
    userNotFoundTemplate: 'unauthorized'
  });

  this.route('user',
  {
    path: '/users/:username',
    data: function() {
      var user = Meteor.users.findOne({username: this.params.username});
      if (!user)
        return null;
      return {
        user: user
      };
    },
    waitOn: [
    Meteor.subscribe('teamMembers', Meteor.userId()),
    Meteor.subscribe('publicMembers')
    ],
    controller: LoggedInUserController,
    action: 'userLoadedAction',
    loadingTemplate: 'waiting',
    notFoundTemplate: 'notFound',
    userFoundTemplate: 'user',
    userNotFoundTemplate: 'unauthorized'
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
        teamCode: this.params.teamCode,
        currentProject: {teamId: currentTeam._id},
        availableProjects: Projects.find({teamId: currentTeam._id},{sort: {statusChanged: -1}}),
        teamMembers: currentTeam.members && Meteor.users.find({_id: {$in: currentTeam.members}})        
      };
    },
    waitOn: [
      Meteor.subscribe('userTeams', Meteor.userId()),
      Meteor.subscribe('userProjects', Meteor.userId()),
      Meteor.subscribe('teamMembers', Meteor.userId()),
    ],
    controller: LoggedInUserController,
    action: 'userLoadedAction',
    loadingTemplate: 'waiting',
    notFoundTemplate: 'notFound',
    userFoundTemplate: 'createProject',
    userNotFoundTemplate: 'unauthorized'
  });

  this.route ('project', 
  { 
    path: '/:teamCode/:projectCode',
    data: function() {
      var currentTeam = Teams.findOne({code: this.params.teamCode});
      if (!currentTeam)
        return null;
      var currentProject = Projects.findOne({teamId: currentTeam._id, code: this.params.projectCode});
      if (!currentProject)
        return null;
      var availableFeatures = Features.find({
          teamId: currentTeam._id,
          projectId: currentProject._id
        },
        {sort: {statusChanged: -1}}
      );
      var notStartedIssues = Issues.find({ 
          teamId: currentTeam._id, 
          projectId: currentProject._id, 
          status: 0, 
          rank: {$exists: true} 
        },
        {sort: {rank: 1}}
      );
      return {
        currentTeam: currentTeam,
        teamCode: this.params.teamCode,
        currentProject: currentProject,
        projectCode: this.params.projectCode,
        availableFeatures: availableFeatures,
        notStartedIssues: notStartedIssues,
        teamMembers: currentTeam.members && Meteor.users.find({_id: {$in: currentTeam.members}})                
      }
    },
    waitOn: [
      Meteor.subscribe('userTeams', Meteor.userId()),
      Meteor.subscribe('userProjects', Meteor.userId()),
      Meteor.subscribe('userFeatures', Meteor.userId()),
      Meteor.subscribe('teamMembers', Meteor.userId())      
    ],
    controller: LoggedInUserController,
    action: 'userLoadedAction',
    loadingTemplate: 'waiting',
    notFoundTemplate: 'notFound',
    userFoundTemplate: 'project',
    userNotFoundTemplate: 'unauthorized'
  });

  this.route ('editProject', 
  { 
    path: '/:teamCode/:projectCode/edit',
    data: function() {
      var currentTeam = Teams.findOne({code: this.params.teamCode});
      if (!currentTeam)
        return null;
      var currentProject = Projects.findOne({teamId: currentTeam._id, code: this.params.projectCode});
      if (!currentProject)
        return null;
      var availableFeatures = Features.find({
          teamId: currentTeam._id,
          projectId: currentProject._id
        },
        {sort: {statusChanged: -1}}
      );
      return {
        action: 'edit',
        currentTeam: currentTeam,
        teamCode: this.params.teamCode,
        currentProject: currentProject,
        projectCode: this.params.projectCode,
        availableFeatures: availableFeatures,
        teamMembers: currentTeam.members && Meteor.users.find({_id: {$in: currentTeam.members}})        
      }
    },
    waitOn: [
      Meteor.subscribe('userTeams', Meteor.userId()),
      Meteor.subscribe('userProjects', Meteor.userId()),
      Meteor.subscribe('userFeatures', Meteor.userId()),
      Meteor.subscribe('teamMembers', Meteor.userId())      
    ],
    controller: LoggedInUserController,
    action: 'userLoadedAction',
    loadingTemplate: 'waiting',
    notFoundTemplate: 'notFound',
    userFoundTemplate: 'editProject',
    userNotFoundTemplate: 'unauthorized'
  });

  this.route('createFeature',
  {
    path: '/:teamCode/:projectCode/feature/create',
    data: function() {
      var currentTeam = Teams.findOne({code: this.params.teamCode});
      if (!currentTeam)
        return null;
      var currentProject = Projects.findOne({teamId: currentTeam._id, code: this.params.projectCode});
      if (!currentProject)
        return null;

      return {
        action: 'create',
        currentTeam: currentTeam,
        teamCode: this.params.teamCode,
        currentProject: currentProject,
        projectCode: this.params.projectCode,
        currentFeature: {teamId: currentTeam._id, projectId: currentProject._id},
        availableFeatures: Features.find({teamId: currentTeam._id, projectId: currentProject._id},{sort: {statusChanged: -1}}),
        teamMembers: currentTeam.members && Meteor.users.find({_id: {$in: currentTeam.members}})        
      };
    },
    waitOn: [
      Meteor.subscribe('userTeams', Meteor.userId()),
      Meteor.subscribe('userProjects', Meteor.userId()),
      Meteor.subscribe('userFeatures', Meteor.userId()),
      Meteor.subscribe('teamMembers', Meteor.userId())
    ],
    controller: LoggedInUserController,
    action: 'userLoadedAction',
    loadingTemplate: 'waiting',
    notFoundTemplate: 'notFound',
    userFoundTemplate: 'createFeature',
    userNotFoundTemplate: 'unauthorized'
  });

  this.route('feature',
  {
    path: '/:teamCode/:projectCode/:featureCode',
    data: function() {
      var currentTeam = Teams.findOne({code: this.params.teamCode});
      if (!currentTeam)
        return null;
      var currentProject = Projects.findOne({teamId: currentTeam._id, code: this.params.projectCode});
      if (!currentProject)
        return null;
      var currentFeature = Features.findOne({teamId: currentTeam._id, projectId: currentProject._id, code: this.params.featureCode});
      if (!currentFeature)
        return null;

      var availableIssues = Issues.find({
          teamId: currentTeam._id,
          projectId: currentProject._id,
          featureId: currentFeature._id
        },
        {sort: {updatedAt: -1}
      });

      return {
        currentTeam : currentTeam,
        teamCode: this.params.teamCode,
        currentProject: currentProject,
        projectCode: this.params.projectCode,
        currentFeature: currentFeature,
        featureCode: this.params.featureCode,
        availableIssues: availableIssues,
        teamMembers: currentTeam.members && Meteor.users.find({_id: {$in: currentTeam.members}})        
      }
    },
    waitOn: [
      Meteor.subscribe('userTeams', Meteor.userId()),
      Meteor.subscribe('userProjects', Meteor.userId()),
      Meteor.subscribe('userFeatures', Meteor.userId()),
      Meteor.subscribe('userIssues', Meteor.userId())    
    ],
    controller: LoggedInUserController,
    action: 'userLoadedAction',
    loadingTemplate: 'waiting',
    notFoundTemplate: 'notFound',
    userFoundTemplate: 'feature',
    userNotFoundTemplate: 'unauthorized'
  });

  this.route('editFeature',
  {
    path: '/:teamCode/:projectCode/:featureCode/edit',
    data: function() {
      var currentTeam = Teams.findOne({code: this.params.teamCode});
      if (!currentTeam)
        return null;
      var currentProject = Projects.findOne({teamId: currentTeam._id, code: this.params.projectCode});
      if (!currentProject)
        return null;
      var currentFeature = Features.findOne({teamId: currentTeam._id, projectId: currentProject._id, code: this.params.featureCode});
      if (!currentFeature)
        return null;

      var availableIssues = Issues.find({
          teamId: currentTeam._id,
          projectId: currentProject._id,
          featureId: currentFeature._id
        },
        {sort: {updatedAt: -1}
      });

      return {
        action: 'edit',
        currentTeam : currentTeam,
        teamCode: this.params.teamCode,
        currentProject: currentProject,
        projectCode: this.params.projectCode,
        currentFeature: currentFeature,
        featureCode: this.params.featureCode,
        availableIssues: availableIssues,
        teamMembers: currentTeam.members && Meteor.users.find({_id: {$in: currentTeam.members}})        
      }
    },
    waitOn: [
      Meteor.subscribe('userTeams', Meteor.userId()),
      Meteor.subscribe('userProjects', Meteor.userId()),
      Meteor.subscribe('userFeatures', Meteor.userId()),
      Meteor.subscribe('userIssues', Meteor.userId()),
      Meteor.subscribe('teamMembers', Meteor.userId())      
    ],
    controller: LoggedInUserController,
    action: 'userLoadedAction',
    loadingTemplate: 'waiting',
    notFoundTemplate: 'notFound',
    userFoundTemplate: 'editFeature',
    userNotFoundTemplate: 'unauthorized'
  });

this.route('createIssue',
{
  path: '/:teamCode/:projectCode/:featureCode/issue/create',
    data: function() {
      var currentTeam = Teams.findOne({code: this.params.teamCode});
      if (!currentTeam)
        return null;
      var currentProject = Projects.findOne({teamId: currentTeam._id, code: this.params.projectCode});
      if (!currentProject)
        return null;
      var currentFeature = Features.findOne({teamId: currentTeam._id, projectId: currentProject._id, code: this.params.featureCode});
      if (!currentFeature)
        return null;
      var tags = Tags.find({teamId: currentTeam._id});

      var availableIssues = Issues.find({
          teamId: currentTeam._id,
          projectId: currentProject._id,
          featureId: currentFeature._id,
          tags: tags
        },
        {sort: {updatedAt: -1}
      });

      return {
        action: 'create',
        currentTeam : currentTeam,
        teamCode: this.params.teamCode,
        currentProject: currentProject,
        projectCode: this.params.projectCode,
        currentFeature: currentFeature,
        featureCode: this.params.featureCode,
        currentIssue: {teamId: currentTeam._id, projectId: currentProject._id, featureId: currentFeature._id},
        availableIssues: availableIssues,
        teamMembers: currentTeam.members && Meteor.users.find({_id: {$in: currentTeam.members}})        
      }
    },
    waitOn: [
      Meteor.subscribe('userTeams', Meteor.userId()),
      Meteor.subscribe('userProjects', Meteor.userId()),
      Meteor.subscribe('userFeatures', Meteor.userId()),
      Meteor.subscribe('userIssues', Meteor.userId()),
      Meteor.subscribe('userTags', Meteor.userId()),
      Meteor.subscribe('teamMembers', Meteor.userId())      
    ],
    controller: LoggedInUserController,
    action: 'userLoadedAction',
    loadingTemplate: 'waiting',
    notFoundTemplate: 'notFound',
    userFoundTemplate: 'createIssue',
    userNotFoundTemplate: 'unauthorized'
  });

  this.route('issue',
  {
    path: '/:teamCode/:projectCode/:featureCode/:issueCode',
    data: function() {
      var currentTeam = Teams.findOne({code: this.params.teamCode});
      if (!currentTeam)
        return null;
      var currentProject = Projects.findOne({teamId: currentTeam._id, code: this.params.projectCode});
      if (!currentProject)
        return null;
      var currentFeature = Features.findOne({teamId: currentTeam._id, projectId: currentProject._id, code: this.params.featureCode});
      if (!currentFeature)
        return null;
      var currentIssue = Issues.findOne({teamId: currentTeam._id, projectId: currentProject._id, featureId: currentFeature._id, code: this.params.issueCode});
      if (!currentIssue)
        return null;

      var notifications = Notifications.find({teamId: currentTeam._id});

      return {
        currentTeam : currentTeam,
        teamCode: this.params.teamCode,
        currentProject: currentProject,
        projectCode: this.params.projectCode,
        currentFeature: currentFeature,
        featureCode: this.params.featureCode,
        currentIssue: currentIssue,
        issueCode: this.params.issueCode,
        notifications: notifications
      }
    },
    waitOn: [
      Meteor.subscribe('userTeams', Meteor.userId()),
      Meteor.subscribe('userProjects', Meteor.userId()),
      Meteor.subscribe('userFeatures', Meteor.userId()),
      Meteor.subscribe('userIssues', Meteor.userId()),
      Meteor.subscribe('userNotifications', Meteor.userId())    
    ],
    controller: LoggedInUserController,
    action: 'userLoadedAction',
    loadingTemplate: 'waiting',
    notFoundTemplate: 'notFound',
    userFoundTemplate: 'issue',
    userNotFoundTemplate: 'unauthorized'
  });

  this.route('editIssue',
  {
    path: '/:teamCode/:projectCode/:featureCode/:issueCode/edit',
    data: function() {
      var currentTeam = Teams.findOne({code: this.params.teamCode});
      if (!currentTeam)
        return null;
      var currentProject = Projects.findOne({teamId: currentTeam._id, code: this.params.projectCode});
      if (!currentProject)
        return null;
      var currentFeature = Features.findOne({teamId: currentTeam._id, projectId: currentProject._id, code: this.params.featureCode});
      if (!currentFeature)
        return null;
      var currentIssue = Issues.findOne({teamId: currentTeam._id, projectId: currentProject._id, featureId: currentFeature._id, code: this.params.issueCode});
      if (!currentIssue)
        return null;

      var tags = Tags.find({teamId: currentTeam._id});

      return {
        action: 'edit',
        currentTeam : currentTeam,
        teamCode: this.params.teamCode,
        currentProject: currentProject,
        projectCode: this.params.projectCode,
        currentFeature: currentFeature,
        featureCode: this.params.featureCode,
        currentIssue: currentIssue,
        issueCode: this.params.issueCode,
        tags: tags
      }
    },
    waitOn: [
      Meteor.subscribe('userTeams', Meteor.userId()),
      Meteor.subscribe('userProjects', Meteor.userId()),
      Meteor.subscribe('userFeatures', Meteor.userId()),
      Meteor.subscribe('userTags', Meteor.userId()),
      Meteor.subscribe('userIssues', Meteor.userId())    
    ],
    controller: LoggedInUserController,
    action: 'userLoadedAction',
    loadingTemplate: 'waiting',
    notFoundTemplate: 'notFound',
    userFoundTemplate: 'editIssue',
    userNotFoundTemplate: 'unauthorized'
  });
});