Meteor.Spinner.options = {
    lines: 13, // The number of lines to draw
    length: 10, // The length of each line
    width: 5, // The line thickness
    radius: 15, // The radius of the inner circle
    corners: 0.7, // Corner roundness (0..1)
    rotate: 0, // The rotation offset
    direction: 1, // 1: clockwise, -1: counterclockwise
    color: '#fff', // #rgb or #rrggbb
    speed: 1, // Rounds per second
    trail: 60, // Afterglow percentage
    shadow: true, // Whether to render a shadow
    hwaccel: false, // Whether to use hardware acceleration
    className: 'spinner', // The CSS class to assign to the spinner
    zIndex: 2e9, // The z-index (defaults to 2000000000)
    top: 'auto', // Top position relative to parent in px
    left: 'auto' // Left position relative to parent in px
};

Meteor.formFunctions = {
  action: function() {
    switch (Meteor.Router.page()) {
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
  teamCode: function() {
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
  currentTeam: function() {
    if (Meteor.Router.page() === 'createTeam')
      return {};

    return Teams.findOne(Session.get('currentTeamId'));
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
    return this.detail && this.detail.length > 320 ? this.detail.substring(0, 320) + "..." : this.detail;
  },
  currentProject: function() {
    if (Meteor.Router.page() === 'createProject')
      return { teamId: Session.get('currentTeamId') };

    return Projects.findOne(Session.get('currentProjectId'));
  },
  currentFeature: function() {
    if (Meteor.Router.page() === 'createFeature')
      return { 
        teamId: Session.get('currentTeamId'),
        projectId: Session.get('currentProjectId'),
        dueDate: moment().format() 
      };

    return Features.findOne(Session.get('currentFeatureId'));
  },
  currentIssue: function() {
    if (Meteor.Router.page() === 'createIssue')
      return {
        teamId: Session.get('currentTeamId'),
        projectId: Session.get('currentProjectId'),
        featureId: Session.get('currentFeatureId')
      };
    
    return Issues.findOne(Session.get('currentIssueId'));
  },
  currentTag: function() {
    return Session.get('currentTag');
  },
  createdByUsername: function() {
    return this.createdByUserId && Meteor.users.findOne(this.createdByUserId) && 
    Meteor.users.findOne(this.createdByUserId).username;
  },
  ownedByUsername: function() {
    return this.ownedByUserId && Meteor.users.findOne(this.ownedByUserId) &&
    Meteor.users.findOne(this.ownedByUserId).username;
  },
  allProjects: function() {
    return Projects.find({teamId: Session.get('currentTeamId')});
  },
  allFeatures: function() {
    return Features.find({
      teamId: Session.get('currentTeamId'),
      projectId: Session.get('currentProjectId')
    });
  },
  allIssues: function() {
    return Issues.find({
      teamId: Session.get('currentTeamId'),
      projectId: Session.get('currentProjectId'),
      featureId: Session.get('currentFeatureId')
    });
  },
  members: function() {
    return Meteor.users.find();
  },
  otherMembers: function() {
    return Meteor.users.find({ _id: { $ne: Meteor.userId() } });
  },
  userId: function() {
    return Meteor.userId();
  },
  username: function() {
    return Meteor.user() && Meteor.user().username;
  },
  isLoggedIn: function() {
    return Meteor.userId();
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
  notStartedIssuesByRanking: function() {
    return Issues.find({ teamId: this.teamId, projectId: this._id, status: 0, rank: {$exists: true} },{sort: {rank: 1}});
  },
  allIssuesNotStarted: function() {
    var featuresOwnedByUser = Features.find({ownedByUserId: Meteor.userId()}).fetch();
    if (featuresOwnedByUser) 
      return Issues.find({ status: 0, featureId: {$in: _.pluck(featuresOwnedByUser, '_id')}});
  },
  allIssuesNotStartedCount: function() {
    var featuresOwnedByUser = Features.find({ownedByUserId: Meteor.userId()}).fetch();
    if (featuresOwnedByUser) 
      return Issues.find({ status: 0, featureId: {$in: _.pluck(featuresOwnedByUser, '_id')}}).count();
  },
  allIssuesNotStartedReady: function() {
    return !allIssuesNotStartedHandle.loading();
  },
  allIssuesNotStartedLoaded: function() {
    var featuresOwnedByUser = Features.find({ownedByUserId: Meteor.userId()}).fetch();
    if (featuresOwnedByUser) {
      return !allIssuesNotStartedHandle.loading() && 
      Issues.find({ status: 0, featureId: {$in: _.pluck(featuresOwnedByUser, '_id')}}).count < allIssuesNotStartedHandle.loaded();
    }
  },
  allIssuesInProgress: function() {
    var featuresOwnedByUser = Features.find({ownedByUserId: Meteor.userId()}).fetch();
    if (featuresOwnedByUser) 
      return Issues.find({ status: 1, featureId: {$in: _.pluck(featuresOwnedByUser, '_id')}});
  },
  allIssuesInProgressCount: function() {
    var featuresOwnedByUser = Features.find({ownedByUserId: Meteor.userId()}).fetch();
    if (featuresOwnedByUser) {
      console.log(Issues.find({ status: 1, featureId: {$in: _.pluck(featuresOwnedByUser, '_id')}}).count());
      return Issues.find({ status: 1, featureId: {$in: _.pluck(featuresOwnedByUser, '_id')}}).count();
    }
  },  
  allIssuesInProgressReady: function() {
    console.log("rady" + !allIssuesInProgressHandle.loading());
    return !allIssuesInProgressHandle.loading();
  },
  allIssuesInProgressLoaded: function() {
    var featuresOwnedByUser = Features.find({ownedByUserId: Meteor.userId()}).fetch();
    if (featuresOwnedByUser) {
      return !allIssuesInProgressHandle.loading() && 
      Issues.find({ status: 1, featureId: {$in: _.pluck(featuresOwnedByUser, '_id')}}).count < allIssuesInProgressHandle.loaded();
    }
  },
  allIssuesCompleted: function() {
    var featuresOwnedByUser = Features.find({ownedByUserId: Meteor.userId()}).fetch();
    if (featuresOwnedByUser) 
      return Issues.find({ status: 2, featureId: {$in: _.pluck(featuresOwnedByUser, '_id')}});
  },
  allIssuesCancelled: function() {
    var featuresOwnedByUser = Features.find({ownedByUserId: Meteor.userId()}).fetch();
    if (featuresOwnedByUser) 
      return Issues.find({ status: 3, featureId: {$in: _.pluck(featuresOwnedByUser, '_id')}});
  },
  allIssuesCompletedCount: function() {
    var featuresOwnedByUser = Features.find({ownedByUserId: Meteor.userId()}).fetch();
    if (featuresOwnedByUser) 
      return Issues.find({ status: 2, featureId: {$in: _.pluck(featuresOwnedByUser, '_id')}}).count();
  },
  allIssuesCancelledCount: function() {
    var featuresOwnedByUser = Features.find({ownedByUserId: Meteor.userId()}).fetch();
    if (featuresOwnedByUser) 
      return Issues.find({ status: 3, featureId: {$in: _.pluck(featuresOwnedByUser, '_id')}}).count();
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
  notStartedIssuesInProject: function() {
    return Issues.find({teamId: Session.get('currentTeamId'), projectId: Session.get('currentProjectId'), status: 0});
  },
  inProgressIssuesInProject: function() {
    return Issues.find({teamId: Session.get('currentTeamId'), projectId: Session.get('currentProjectId'), status: 1});
  },
  completedIssuesInProject: function() {
    return Issues.find({teamId: Session.get('currentTeamId'), projectId: Session.get('currentProjectId'), status: 2});
  },
  cancelledIssuesInProject: function() {
    return Issues.find({teamId: Session.get('currentTeamId'), projectId: Session.get('currentProjectId'), status: 3});
  }
};