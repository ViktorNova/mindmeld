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
    if (Meteor.Router.page() === 'createTeam')
      return {};

    if (Session.get('currentTeamId') == 'LOADING')
      return null;

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
    return this.detail && this.detail.length > 160 ? this.detail.substring(0, 160) + "..." : this.detail;
  },
  currentProject: function() {
    if (Meteor.Router.page() === 'createProject')
      return { teamId: Session.get('currentTeamId') };

    if (Session.get('currentProjectId') == 'LOADING')
      return null;

    return Projects.findOne(Session.get('currentProjectId'));
  },
  currentFeature: function() {
    if (Meteor.Router.page() === 'createFeature')
      return { 
        teamId: Session.get('currentTeamId'),
        projectId: Session.get('currentProjectId'),
        dueDate: moment().format() 
      };

    if (Session.get('currentFeatureId') == 'LOADING')
      return null;

    return Features.findOne(Session.get('currentFeatureId'));
  },
  currentIssue: function() {
    if (Meteor.Router.page() === 'createIssue')
      return {
        teamId: Session.get('currentTeamId'),
        projectId: Session.get('currentProjectId'),
        featureId: Session.get('currentFeatureId')
      };

    if (Session.get('currentIssueId') == 'LOADING')
      return null;

    return Issues.findOne(Session.get('currentIssueId'));
  },
  currentTag: function() {

    if (Session.get('currentTagId') == 'LOADING')
      return null;

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
  }
};