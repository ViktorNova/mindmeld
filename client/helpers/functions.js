Meteor.formFunctions = {
  action: function() {
    switch (Meteor.Router.page()) {
      case 'editTeam':
      case 'editProject':
      case 'editMilestone':
      case 'editIssue':
        return 'edit';
        break;
      case 'createTeam':
      case 'createProject':
      case 'createMilestone':
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
    return Teams.findOne(this.teamId).code;
  },
  teamName: function() {
  	return Teams.findOne(this.teamId).name;
   },
  projectCode: function() {
    return Projects.findOne(this.projectId).code;
  },
  projectName: function() {
    return Projects.findOne(this.projectId).name;
  },
  milestoneCode: function() {
    return Milestones.findOne(this.milestoneId).code;
  },
  milestoneName: function() {
    return Milestones.findOne(this.milestoneId).name;
  },
  issueCode: function() {
    return Issues.findOne(this.issueId).code;    
  },
  issueName: function() {
    return Issues.findOne(this.issueId).name;
  },
  issueDueDate: function() {
    return Milestones.findOne(this.milestoneId).dueDate;
  },
  currentTeam: function() {
    if (Meteor.Router.page() === 'createTeam')
      return {};

    return Teams.findOne(Session.get('currentTeamId'));
  },
  currentProject: function() {
    if (Meteor.Router.page() === 'createProject')
      return { teamId: Session.get('currentTeamId') };

    return Projects.findOne(Session.get('currentProjectId'));
  },
  currentMilestone: function() {
    if (Meteor.Router.page() === 'createMilestone')
      return { 
        teamId: Session.get('currentTeamId'),
        projectId: Session.get('currentProjectId'),
        dueDate: moment().format() 
      };

    return Milestones.findOne(Session.get('currentMilestoneId'));
  },
  currentIssue: function() {
    if (Meteor.Router.page() === 'createIssue')
      return {
        teamId: Session.get('currentTeamId'),
        projectId: Session.get('currentProjectId'),
        milestoneId: Session.get('currentMilestoneId')
      };
    
    return Issues.findOne(Session.get('currentIssueId'));
  },
  createdByUsername: function() {
    return Meteor.users.findOne(this.createdByUserId).username;
  },
  ownedByUsername: function() {
    return Meteor.users.findOne(this.ownedByUserId).username;
  },
  assignedToUsername: function() {
    return Meteor.users.findOne(this.assignedToUserId).username;
  },
  allProjects: function() {
    return Projects.find({teamId: Session.get('currentTeamId')});
  },
  allMilestones: function() {
    return Milestones.find({
      teamId: Session.get('currentTeamId'),
      projectId: Session.get('currentProjectId')
    });
  },
  allIssues: function() {
    return Issues.find({
      teamId: Session.get('currentTeamId'),
      projectId: Session.get('currentProjectId'),
      milestoneId: Session.get('currentMilestoneId')
    });
  },
  members: function() {
    return Meteor.users.find();
  },
  userId: function() {
    return Meteor.userId();
  },
  isLoggedIn: function() {
    return Meteor.userId();
  },
  momentTimeAgoCreatedAt: function() {
    return moment(this.createdAt).fromNow();
  }
};