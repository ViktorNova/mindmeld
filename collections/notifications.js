Notifications = new Meteor.Collection('notifications');

Meteor.methods({
  dismissNotification: function(notificationId) {
    var userId = Meteor.userId();
    if (!userId)
      throw new Meteor.Error(401, "You need to login to dismiss a notification");

    Notifications.update({_id: notificationId},{$push: { readBy: userId}});
  },
  createTeamNotification: function(notificationAttributes) {
    var user = Meteor.user();
    if (!user)
      throw new Meteor.Error(401, "You need to login to edit a team");

    var team = notificationAttributes.team;

    var notification = _.extend(_.pick(notificationAttributes,
      'entity','action','team'), {
      teamId: team._id,
      name: team.name,
      createdAt: new Date(),
      createdByUserId: Meteor.userId()
    });

    var notificationId = Notifications.insert(notification);
    return Notifications.findOne(notificationId);  
  },
  editTeamNotification: function(notificationAttributes) {
    var user = Meteor.user();
    if (!user)
      throw new Meteor.Error(401, "You need to login to edit a team");
    //todo: validation

    var oldTeam = notificationAttributes.oldTeam;
    var newTeam = notificationAttributes.newTeam;

    if (oldTeam._id !== newTeam._id)
      throw new Meteor.Error(500, "Auditing error when attempting to edit a team. Previous and new versions of id do not match");

    var teamDelta = Meteor.Mindmeld.delta(oldTeam, newTeam);

    var notification = _.extend(_.pick(notificationAttributes,
      'entity', 'action'), {
      teamId: newTeam._id,
      name: newTeam.name,
      createdAt: new Date(),
      createdByUserId: Meteor.userId(),
      delta: teamDelta
    });

    var notificationId = Notifications.insert(notification);

    return Notifications.findOne(notificationId);    
  },
  createProjectNotification: function(notificationAttributes) {
    var user = Meteor.user();
    if (!user)
      throw new Meteor.Error(401, "You need to login to edit a project");

    var project = notificationAttributes.project;

    var notification = _.extend(_.pick(notificationAttributes,
      'entity','action','project'), {
      teamId: project.teamId,
      projectId: project._id,
      name: project.name,
      createdAt: new Date(),
      createdByUserId: Meteor.userId()
    });

    var notificationId = Notifications.insert(notification);
    return Notifications.findOne(notificationId);  
  },
  editProjectNotification: function(notificationAttributes) {
    var user = Meteor.user();
    if (!user)
      throw new Meteor.Error(401, "You need to login to edit a project");
    //todo: validation

    var oldProject = notificationAttributes.oldProject;
    var newProject = notificationAttributes.newProject;

    if (oldProject._id !== newProject._id)
      throw new Meteor.Error(500, "Auditing error when attempting to edit a project. Previous and new versions of id do not match");

    var projectDelta = Meteor.Mindmeld.delta(oldProject, newProject);

    var notification = _.extend(_.pick(notificationAttributes,
      'entity', 'action'), {
      teamId: newProject.teamId,
      projectId: newProject._id,
      name: newProject.name,
      createdAt: new Date(),
      createdByUserId: Meteor.userId(),
      delta: projectDelta
    });

    var notificationId = Notifications.insert(notification);

    return Notifications.findOne(notificationId);    
  },
  createFeatureNotification: function(notificationAttributes) {
    var user = Meteor.user();
    if (!user)
      throw new Meteor.Error(401, "You need to login to edit a feature");

    var feature = notificationAttributes.feature;

    var notification = _.extend(_.pick(notificationAttributes,
      'entity','action','feature'), {
      teamId: feature.teamId,
      projectId: feature.projectId,
      featureId: feature._id,
      name: feature.name,
      createdAt: new Date(),
      createdByUserId: Meteor.userId()
    });

    var notificationId = Notifications.insert(notification);
    return Notifications.findOne(notificationId);  
  },
  editFeatureNotification: function(notificationAttributes) {
    var user = Meteor.user();
    if (!user)
      throw new Meteor.Error(401, "You need to login to edit a feature");
    //todo: validation

    var oldFeature = notificationAttributes.oldFeature;
    var newFeature = notificationAttributes.newFeature;

    if (oldFeature._id !== newFeature._id)
      throw new Meteor.Error(500, "Auditing error when attempting to edit a feature. Previous and new versions of id do not match");

    var featureDelta = Meteor.Mindmeld.delta(oldFeature, newFeature);

    var notification = _.extend(_.pick(notificationAttributes,
      'entity', 'action'), {
      teamId: newFeature.teamId,
      projectId: newFeature.projectId,
      featureId: newFeature._id,
      name: newFeature.name,
      createdAt: new Date(),
      createdByUserId: Meteor.userId(),
      delta: featureDelta,
      readBy: []
    });

    var notificationId = Notifications.insert(notification);

    return Notifications.findOne(notificationId);    
  },
  issueStatusChangeNotification: function(notificationAttributes) {
    var user = Meteor.user();
    if (!user)
      throw new Meteor.Error(401, "You need to login to edit an issue");

    var issue = notificationAttributes.issue;

    var notification = _.extend(_.pick(notificationAttributes,
      'entity', 'action','oldStatus','newStatus'), {
      teamId: issue.teamId,
      projectId: issue.projectId,
      featureId: issue.featureId,
      issueId: issue._id,
      name: issue.name,
      createdAt: new Date(),
      createdByUserId: Meteor.userId()
    });

    var notificationId = Notifications.insert(notification);
    return Notifications.findOne(notificationId);
  },
  createIssueNotification: function(notificationAttributes) {
    var user = Meteor.user();
    if (!user)
      throw new Meteor.Error(401, "You need to login to edit an issue");

    var issue = notificationAttributes.issue;

    var notification = _.extend(_.pick(notificationAttributes,
      'entity','action','issue'), {
      teamId: issue.teamId,
      projectId: issue.projectId,
      featureId: issue.featureId,
      issueId: issue._id,
      name: issue.name,
      createdAt: new Date(),
      createdByUserId: Meteor.userId()
    });

    var notificationId = Notifications.insert(notification);
    return Notifications.findOne(notificationId);
  },
  editIssueNotification: function(notificationAttributes) {
    var user = Meteor.user();
    if (!user)
      throw new Meteor.Error(401, "You need to login to edit an issue");
    //todo: validation

    var oldIssue = notificationAttributes.oldIssue;
    var newIssue = notificationAttributes.newIssue;

    if (oldIssue._id !== newIssue._id)
      throw new Meteor.Error(500, "Auditing error when attempting to edit an issue. Previous and new versions of id do not match");

    var issueDelta = Meteor.Mindmeld.delta(oldIssue, newIssue);

    var notification = _.extend(_.pick(notificationAttributes,
      'entity', 'action'), {
      teamId: newIssue.teamId,
      projectId: newIssue.projectId,
      featureId: newIssue.featureId,
      issueId: newIssue._id,
      name: newIssue.name,
      createdAt: new Date(),
      createdByUserId: Meteor.userId(),
      delta: issueDelta
    });

    var notificationId = Notifications.insert(notification);

    return Notifications.findOne(notificationId);
  },
  addCommentNotification: function(notificationAttributes) {
    var user = Meteor.user();
    if (!user)
      throw new Meteor.Error(401, "You need to login to edit an issue");

    var issue = notificationAttributes.issue;

    var notification = _.extend(_.pick(notificationAttributes,
      'entity','action','commentId','issue'), {
      teamId: issue.teamId,
      projectId: issue.projectId,
      featureId: issue.featureId,
      issueId: issue._id,
      name: issue.name,
      createdAt: new Date(),
      createdByUserId: Meteor.userId()
    });

    var notificationId = Notifications.insert(notification);
    return Notifications.findOne(notificationId);
  }
});