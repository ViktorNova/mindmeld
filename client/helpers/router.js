Router.configure({
  layout: 'layout'
});

Router.map(function() {
  this.route('home',
  {
    path: '/',
    data: function() {
      var availableTeams = Teams.find({members: {$in: [Meteor.userId()]}});
      return {
        availableTeams: availableTeams,
        invitedTeamsForUsername: TeamInvites.find({username: Meteor.user() && Meteor.user().username}),
        invitedTeamsForUsernameCount: TeamInvites.find({username: Meteor.user() && Meteor.user().username}).count(),
        allIssuesNotStarted: Issues.find({status: 0},{sort: {updatedAt: -1}}),
        allIssuesInProgress: Issues.find({status: 1},{sort: {statusChanged: -1}}),
        allIssuesCompleted: Issues.find({status: 2},{sort: {statusChanged: -1}}),
        allIssuesCancelled: Issues.find({status: 3},{sort: {statusChanged: -1}}),
        allIssuesNotStartedCount: Issues.find({status: 0}).count(),
        allIssuesInProgressCount: Issues.find({status: 1}).count(),
        allIssuesCompletedCount: Issues.find({status: 2}).count(),
        allIssuesCancelledCount: Issues.find({status: 3}).count()
      };
    },
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
    loadingTemplate: 'waiting',
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
    data: function() {
      return {
        emailVerificationToken: this.params.emailVerificationToken
      }
    },
    controller: VerifyEmailTokenController,
    action: 'verifyToken',
    loadingTemplate: 'waiting'
  });

  this.route('emailVerified',
  {
    path: '/email-verified',
    data: function() {
      return {
        usernames: Meteor.users.find({}, {fields: { username: 1}})
      }
    },
    waitOn: Meteor.subscribe('usernames'),
    loadingTemplate: 'waiting',
    template: 'emailVerified'
  });

  this.route('acceptEmailInvite',
  {
    path: '/accept-email-invite',
    data: function() {

      var invitedTeam;
      var teamInvite = TeamInvites.findOne(this.params.teamInviteId);
      if (!teamInvite)
        invitedTeam = null;
      else 
        invitedTeam = Teams.findOne({_id: teamInvite.teamId});
      if (!invitedTeam)
        invitedTeam = null;

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
          teamMovements: Movements.find({teamId: currentTeam._id}),
          teamTags: Tags.find({teamId: currentTeam._id }, {sort: {count: -1}})
        };
      } else {
        return {
          publicViewOnly: true,
          currentTeam: currentTeam,
          teamCode: this.params.teamCode
        };
      }
    },
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
      var currentTag = Tags.findOne({teamId: currentTeam._id, tag: this.params.tag});
      var notStartedIssuesWithTag = Issues.find({teamId: currentTeam._id, status: 0, tags: {$in: [this.params.tag]}},{sort: {rank: 1}});
      var inProgressIssuesWithTag = Issues.find({teamId: currentTeam._id, status: 1, tags: {$in: [this.params.tag]}},{sort: {statusChanged: -1}});
      var completedIssuesWithTag = Issues.find({teamId: currentTeam._id, status: 2, tags: {$in: [this.params.tag]}},{sort: {statusChanged: -1}});
      var cancelledIssuesWithTag = Issues.find({teamId: currentTeam._id, status: 3, tags: {$in: [this.params.tag]}},{sort: {statusChanged: -1}});
      var notStartedIssuesWithTagCount = Issues.find({teamId: currentTeam._id, status: 0, tags: {$in: [this.params.tag]}},{sort: {rank: 1}}).count();
      var inProgressIssuesWithTagCount = Issues.find({teamId: currentTeam._id, status: 1, tags: {$in: [this.params.tag]}},{sort: {statusChanged: -1}}).count();
      var completedIssuesWithTagCount = Issues.find({teamId: currentTeam._id, status: 2, tags: {$in: [this.params.tag]}},{sort: {statusChanged: -1}}).count();
      var cancelledIssuesWithTagCount = Issues.find({teamId: currentTeam._id, status: 3, tags: {$in: [this.params.tag]}},{sort: {statusChanged: -1}}).count();

      return {
        currentTeam: currentTeam,
        teamCode: this.params.teamCode,
        currentTag: currentTag,
        notStartedIssuesWithTag: notStartedIssuesWithTag,
        inProgressIssuesWithTag: inProgressIssuesWithTag,
        completedIssuesWithTag: completedIssuesWithTag,
        cancelledIssuesWithTag: cancelledIssuesWithTag,
        notStartedIssuesWithTagCount: notStartedIssuesWithTagCount,
        inProgressIssuesWithTagCount: inProgressIssuesWithTagCount,
        completedIssuesWithTagCount: completedIssuesWithTagCount,
        cancelledIssuesWithTagCount: cancelledIssuesWithTagCount,
        teamMembers: currentTeam.members && Meteor.users.find({_id: {$in: currentTeam.members}})
      };
    },
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
        teamMembers: currentTeam.members && Meteor.users.find({_id: {$in: currentTeam.members}}),
        teamInvites: TeamInvites.find({teamId: currentTeam._id }),
        teamInvitesWithEmail: TeamInvites.find({email: {$exists: true}, teamId: currentTeam._id}),
        teamInvitesWithUsername: TeamInvites.find({username: {$exists: true}, teamId: currentTeam._id})
      };
    },
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
      var notStartedIssuesInProject = Issues.find({ 
          teamId: currentTeam._id, 
          projectId: currentProject._id, 
          status: 0, 
          rank: {$exists: true} 
        },
        {sort: {rank: 1}}
      );
      var inProgressIssuesInProject = Issues.find({ 
          teamId: currentTeam._id, 
          projectId: currentProject._id, 
          status: 1
        },
        {sort: {rank: 1}}
      );
      var completedIssuesInProject = Issues.find({ 
          teamId: currentTeam._id, 
          projectId: currentProject._id, 
          status: 2
        },
        {sort: {rank: 1}}
      );
      var cancelledIssuesInProject = Issues.find({ 
          teamId: currentTeam._id, 
          projectId: currentProject._id, 
          status: 3
        },
        {sort: {rank: 1}}
      );

      return {
        currentTeam: currentTeam,
        teamCode: this.params.teamCode,
        currentProject: currentProject,
        projectCode: this.params.projectCode,
        availableFeatures: availableFeatures,
        notStartedIssuesInProject: notStartedIssuesInProject,
        inProgressIssuesInProject: inProgressIssuesInProject,
        completedIssuesInProject: completedIssuesInProject,
        cancelledIssuesInProject: cancelledIssuesInProject,
        notStartedIssuesInProjectCount: notStartedIssuesInProject.count(),
        inProgressIssuesInProjectCount: inProgressIssuesInProject.count(),
        completedIssuesInProjectCount: completedIssuesInProject.count(),
        cancelledIssuesInProjectCount: cancelledIssuesInProject.count(),
        teamMembers: currentTeam.members && Meteor.users.find({_id: {$in: currentTeam.members}})                
      }
    },
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
        tags: tags,
        teamMembers: currentTeam.members && Meteor.users.find({_id: {$in: currentTeam.members}})        
      }
    },
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
    controller: LoggedInUserController,
    action: 'userLoadedAction',
    loadingTemplate: 'waiting',
    notFoundTemplate: 'notFound',
    userFoundTemplate: 'editIssue',
    userNotFoundTemplate: 'unauthorized'
  });
});