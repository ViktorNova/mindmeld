function getNotifications() {
  var findParameters = {
    teamId: Session.get('currentTeamId'),
    projectId: Session.get('currentProjectId'),
    featureId: Session.get('currentFeatureId'),
    issueId: Session.get('currentIssueId'),
    readBy: {$nin: [ Meteor.userId() ]}
  };

  return Notifications.find(_.compactObject(findParameters),
    {sort: { createdAt: -1 }, reactive: true}
  );
};

Meteor.formFunctions = {
  action: function() {
    switch (Router.current().route.name) {
      case 'editTeam':
      case 'editProject':
      case 'editFeature':
      case 'editIssue':
        return 'edit';
        break;
      case 'createTeam':
      case 'createProject':
      case 'createFeature':
      case 'createIssue':
        return 'create';
        break;
      default:
        return "";
    }
  }
};

Meteor.userFunctions = {
  teamParams: function() {
    return {
      teamCode: this.code
    }
  },
  projectParams: function() {
    return {
      teamCode: Teams.findOne(this.teamId).code,
      projectCode: this.code
    };
  },
  featureParams: function() {
    return {
      teamCode: Teams.findOne(this.teamId).code,
      projectCode: Projects.findOne(this.projectId).code,
      featureCode: this.code
    }
  },
  issueParams: function() {
    return {
      teamCode: Teams.findOne(this.teamId).code,
      projectCode: Projects.findOne(this.projectId).code,
      featureCode: Features.findOne(this.featureId).code,
      issueCode: this.code
    }
  },
  tagParams: function() {
    return {
      teamCode: Teams.findOne(this.teamId).code,
      tag: this.tag
    }
  },
  addError: function(reason) {
    $('#error-notification').append('<div class="alert alert-error"><button type="button" class="close" data-dismiss="alert">&times;</button>' + reason + '</div>');
  },
  notificationCount: function() {
    return getNotifications().count();
  },
  notifications: function() {
    return getNotifications();
  },
  teamCode: function() {
    console.log('checking ' + this.teamId);
    return this.teamId && Teams.findOne(this.teamId) && 
    Teams.findOne(this.teamId).code;
  },
  teamName: function() {
  	return this.teamId && Teams.findOne(this.teamId) &&
    Teams.findOne(this.teamId).name;
   },
  projectCode: function() {
    return this.projectId && Projects.findOne(this.projectId) &&
    Projects.findOne(this.projectId).code;
  },
  projectName: function() {
    return this.projectId && Projects.findOne(this.projectId) &&
    Projects.findOne(this.projectId).name;
  },
  featureCode: function() {
    return this.featureId && Features.findOne(this.featureId) &&
    Features.findOne(this.featureId).code;
  },
  featureName: function() {
    return this.featureId && Features.findOne(this.featureId) &&
    Features.findOne(this.featureId).name;
  },
  issueCode: function() {
    return this.issueId && Issues.findOne(this.issueId) && Issues.findOne(this.issueId) &&
    Issues.findOne(this.issueId).code;    
  },
  issueName: function() {
    return this.issueId && Issues.findOne(this.issueId) && 
    Issues.findOne(this.issueId).name;
  },
  issueDueDate: function() {
    return this.featureId && Features.findOne(this.featureId) &&
    Features.findOne(this.featureId).dueDate;
  },
  issueComments: function() {
    return Comments.find({issueId: this._id, teamId: this.teamId},{sort: {createdAt: -1}});
  },
  currentTeam: function() {
    return Teams.findOne({code: Router.current().params.teamCode});
  },
  statusKey: function() {
    return Meteor.Mindmeld.toStatusEnum(this.status) && Meteor.Mindmeld.toStatusEnum(this.status).key;
  },
  statusNotStarted: function() {
    return Meteor.Mindmeld.toStatusEnum(this.status) && Meteor.Mindmeld.toStatusEnum(this.status).key === "notStarted";
  },
  statusInProgress: function() {
    return Meteor.Mindmeld.toStatusEnum(this.status) && Meteor.Mindmeld.toStatusEnum(this.status).key === "inProgress";
  },
  statusCompleted: function() {
    return Meteor.Mindmeld.toStatusEnum(this.status) && Meteor.Mindmeld.toStatusEnum(this.status).key === "completed";
  },
  statusCancelled: function() {
    return Meteor.Mindmeld.toStatusEnum(this.status) && Meteor.Mindmeld.toStatusEnum(this.status).key === "cancelled";
  },
  statusDisplay: function() {
    return Meteor.Mindmeld.toStatusEnum(this.status) && Meteor.Mindmeld.toStatusEnum(this.status).display;
  },
  truncatedDetail: function() {    
    return this.detail && this.detail.length > 160 ? this.detail.substring(0, 160) + "..." : this.detail;
  },
  // currentProject: function() {
  //   if (Meteor.Router.page() === 'createProject')
  //     return { teamId: Session.get('currentTeamId') };

  //   if (Session.get('currentProjectId') == 'LOADING')
  //     return null;

  //   return Projects.findOne(Session.get('currentProjectId'));
  // },
  // currentFeature: function() {
  //   if (Meteor.Router.page() === 'createFeature')
  //     return { 
  //       teamId: Session.get('currentTeamId'),
  //       projectId: Session.get('currentProjectId'),
  //       dueDate: moment().format() 
  //     };

  //   if (Session.get('currentFeatureId') == 'LOADING')
  //     return null;

  //   return Features.findOne(Session.get('currentFeatureId'));
  // },
  // currentIssue: function() {
  //   if (Meteor.Router.page() === 'createIssue') {
  //     var feature = Features.findOne(Session.get('currentFeatureId'));
  //     return {
  //       teamId: Session.get('currentTeamId'),
  //       projectId: Session.get('currentProjectId'),
  //       featureId: Session.get('currentFeatureId'),
  //       ownedByUserId: feature && feature.ownedByUserId,
  //       status: 0
  //     };
  //   }

  //   if (Session.get('currentIssueId') == 'LOADING')
  //     return null;

  //   return Issues.findOne(Session.get('currentIssueId'));
  // },
  // currentTag: function() {

  //   if (Session.get('currentTagId') == 'LOADING')
  //     return null;

  //   return Session.get('currentTag');
  // },
  createdByUsername: function() {
    return this.createdByUsername || (this.createdByUserId && Meteor.users.findOne(this.createdByUserId) && 
    Meteor.users.findOne(this.createdByUserId).username);
  },
  ownedByUsername: function() {
    return this.ownedByUserId && Meteor.users.findOne(this.ownedByUserId) &&
    Meteor.users.findOne(this.ownedByUserId).username;
  },
  members: function() {
    return Meteor.users.find();
  },
  otherMembers: function() {
    console.log("o");
    console.log(Session.get('currentTeamId'));
    var team = Teams.findOne(Session.get('currentTeamId'));
    if (team) {
      var remaining = _.without(team.members, Meteor.userId());
      console.log(remaining);
      return remaining;
    }
  },
  ownedByCurrentUser: function() {
    return this && this.ownedByUserId && this.ownedByUserId === Meteor.userId();
  },
  following: function() {
    return Session.get('following');
  },
  followingUsername: function() {
    var user = Meteor.users.findOne(Session.get('following'));
    return user ? user.username : 'Nobody';
  },
  momentTimeAgoCreatedAt: function() {
    return this.createdAt && moment(this.createdAt) && 
    moment(this.createdAt).fromNow();
  },
  momentStatusChanged: function() {
    return this.statusChanged && moment(this.statusChanged) && 
    moment(this.statusChanged).fromNow();
  },
  tagsAsCommaSeperatedString: function() {
    return this.tags && this.tags.join(",");
  },
  iconTags: function() {
    if (this.tags) {
      var teamCode = this.teamId && Teams.findOne(this.teamId) && Teams.findOne(this.teamId).code;
      return _.map(this.tags, function(tag) { return '<a href="' + Meteor.Router.tagPath(teamCode, tag) + '"><span class="label"><i class="icon-tag"></i> ' + tag + '</span></a>'; }).join(' ');
    }
  },
  notStartedIssuesInProject: function() {
    return Issues.find({teamId: Session.get('currentTeamId'), projectId: Session.get('currentProjectId'), status: 0},{sort: {rank: 1}});
  },
  inProgressIssuesInProject: function() {
    return Issues.find({teamId: Session.get('currentTeamId'), projectId: Session.get('currentProjectId'), status: 1},{sort: {statusChanged: -1}});
  },
  completedIssuesInProject: function() {
    return Issues.find({teamId: Session.get('currentTeamId'), projectId: Session.get('currentProjectId'), status: 2},{sort: {statusChanged: -1}});
  },
  cancelledIssuesInProject: function() {
    return Issues.find({teamId: Session.get('currentTeamId'), projectId: Session.get('currentProjectId'), status: 3},{sort: {statusChanged: -1}});
  },
  currentUserOwnsComment: function() {
    return this.createdByUserId && this.createdByUserId == Meteor.userId();
  },
  teamsCreatedByUserCount: function() {
    return Teams.find({createdByUserId: Meteor.userId()}).count();
  },
  projectsInTeamCount: function() {
    return Projects.find({teamId: this._id}).count();
  },
  projectsInTeamCountIsThreeOrGreater: function() {
    return Projects.find({teamId: this._id}).count() >= 3;
  },
  invitesAndMembersCountInTeamIsThreeOrGreater: function() {
    var currentTeam = Teams.findOne(Session.get('currentTeamId'));

    if (!currentTeam)
      return false;

    var memberCount = currentTeam.members.length;
    var teamInvitesCount = TeamInvites.find({teamId: Session.get('currentTeamId')}).fetch().length;

    return (memberCount + teamInvitesCount) >= 7;
  },
  getTeamId: function(teamCode) {
    if (!teamCode)
      return null;

    var team = Teams.findOne({code: teamCode});
    if (team) {
      return team._id;
    } else {
      return "NOTFOUND";
    }
  },
  getProjectId: function(projectCode) {

    if (!projectCode)
      return null;

    var project = Projects.findOne({code: projectCode});
    if (project) {
      return project._id;
    } else {
      return "NOTFOUND";
    }
  },
  getFeatureId: function(featureCode) {
    if (!featureCode)
      return null;

    var feature = Features.findOne({code: featureCode});
    if (feature) {
      return feature._id;
    } else {
      return "NOTFOUND";
    }
  },
  getIssueId: function(issueCode) {
    if (!issueCode)
      return null;

    var issue = Issues.findOne({code: issueCode});
    if (issue) {
      return issue._id;
    } else {
      return "NOTFOUND";
    }
  },
  getTagId: function(tagCode) {
    if (!tagCode)
      return null;

    var tag = Tags.findOne({code: tagCode});
    if (tag) {
      return tag._id;
    } else {
      return "NOTFOUND";
    }
  },
  teamInvite: function() {
    return TeamInvites.findOne(Session.get('teamInviteId'));
  },
  getTeamInvites: function() {
    return TeamInvites.find({teamId: this._id });
  },
  getTeamInvitesWithEmail: function() {
    return TeamInvites.find({email: {$exists: true}, teamId: this._id});
  },
  getTeamInvitesWithUsername: function() {
    return TeamInvites.find({username: {$exists: true}, teamId: this._id});
  },
  teamMembers: function() {
    return Meteor.users.find({_id: {$in: this.members}});
  },
  teamTags: function(){
    return Tags.find({teamId: this._id }, {sort: {count: -1}});
  },
  notStartedIssuesWithTag: function() {
    return Issues.find({teamId: Session.get('currentTeamId'), status: 0, tags: {$in: [Session.get('currentTag')]}});
  },
  inProgressIssuesWithTag: function() {
    return Issues.find({teamId: Session.get('currentTeamId'), status: 1, tags: {$in: [Session.get('currentTag')]}});
  },
  completedIssuesWithTag: function() {
    return Issues.find({teamId: Session.get('currentTeamId'), status: 2, tags: {$in: [Session.get('currentTag')]}});
  },
  cancelledIssuesWithTag: function() {
    return Issues.find({teamId: Session.get('currentTeamId'), status: 3, tags: {$in: [Session.get('currentTag')]}});
  },
  notStartedIssuesWithTagCount: function() {
    return Issues.find({teamId: Session.get('currentTeamId'), status: 0, tags: {$in: [this.tag]}}).count();
  },
  inProgressIssuesWithTagCount: function() {
    return Issues.find({teamId: Session.get('currentTeamId'), status: 1, tags: {$in: [this.tag]}}).count();
  },
  completedIssuesWithTagCount: function() {
    return Issues.find({teamId: Session.get('currentTeamId'), status: 2, tags: {$in: [this.tag]}}).count();
  },
  cancelledIssuesWithTagCount: function() {
    return Issues.find({teamId: Session.get('currentTeamId'), status: 3, tags: {$in: [this.tag]}}).count();
  },
  userIsTeamOwner: function() {
    var currentTeam = Teams.findOne({code: Router.current().params.teamCode});
    return Meteor.userId == currentTeam.owner;
  },
  invitedTeam: function() {
    var teamInvite = TeamInvites.findOne({_id: Session.get('teamInviteId'), receivedFrom: Session.get('teamInviteFromUserId')});
    if (teamInvite)
      return Teams.findOne({_id: teamInvite.teamId});
  },
  invitedTeamsForUsername: function() {
    return TeamInvites.find({username: Meteor.user() && Meteor.user().username});
  }
};