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
  allIssuesInProgress: function() {
    var featuresOwnedByUser = Features.find({ownedByUserId: Meteor.userId()}).fetch();
    if (featuresOwnedByUser) 
      return Issues.find({ status: 1, featureId: {$in: _.pluck(featuresOwnedByUser, '_id')}});
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