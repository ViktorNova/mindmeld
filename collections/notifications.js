Notifications = new Meteor.Collection('notifications');

function delta(oldItem, newItem) {
  var added = {};
  var removed = {};
  var changedFrom = {};
  var changedTo = {};

  var addedKeys = _.difference(_.keys(newItem), _.keys(oldItem));
  if (addedKeys) {
    added = 
      _.object(_.map(addedKeys, function(item) { return [item, newItem[item] ] }));
  }
  var removedKeys = _.difference(_.keys(oldItem), _.keys(newItem));
  if (removedKeys) {
    removed =
      _.object(_.map(removedKeys, function(item) { return [item, oldItem[item] ] }));
  }
  var sameKeys = _.intersection(_.keys(oldItem), _.keys(newItem));
  if (sameKeys) {
    _.each(sameKeys, function(sameKey) {
      if (oldItem[sameKey] instanceof Array && newItem[sameKey]) {
        if (_.difference(oldItem[sameKey], newItem[sameKey]).length) {
          changedFrom[sameKey] = oldItem[sameKey];
          changedTo[sameKey] = newItem[sameKey];
        }
      } else {
        if (oldItem[sameKey] !== newItem[sameKey]) {
          changedFrom[sameKey] = oldItem[sameKey];
          changedTo[sameKey] = newItem[sameKey];
        }
      }
    });
  }

  return {
    added: added,
    removed: removed,
    changedFrom: changedFrom,
    changedTo: changedTo
  }
};

Meteor.methods({
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

    var teamDelta = delta(oldTeam, newTeam);

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

    var projectDelta = delta(oldProject, newProject);

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
  createMilestoneNotification: function(notificationAttributes) {
    var user = Meteor.user();
    if (!user)
      throw new Meteor.Error(401, "You need to login to edit a milestone");

    var milestone = notificationAttributes.milestone;

    var notification = _.extend(_.pick(notificationAttributes,
      'entity','action','milestone'), {
      teamId: milestone.teamId,
      projectId: milestone.projectId,
      milestoneId: milestone._id,
      name: milestone.name,
      createdAt: new Date(),
      createdByUserId: Meteor.userId()
    });

    var notificationId = Notifications.insert(notification);
    return Notifications.findOne(notificationId);  
  },
  editMilestoneNotification: function(notificationAttributes) {
    var user = Meteor.user();
    if (!user)
      throw new Meteor.Error(401, "You need to login to edit a milestone");
    //todo: validation

    var oldMilestone = notificationAttributes.oldMilestone;
    var newMilestone = notificationAttributes.newMilestone;

    if (oldMilestone._id !== newMilestone._id)
      throw new Meteor.Error(500, "Auditing error when attempting to edit a milestone. Previous and new versions of id do not match");

    var milestoneDelta = delta(oldMilestone, newMilestone);

    var notification = _.extend(_.pick(notificationAttributes,
      'entity', 'action'), {
      teamId: newMilestone.teamId,
      projectId: newMilestone.projectId,
      milestoneId: newMilestone._id,
      name: newMilestone.name,
      createdAt: new Date(),
      createdByUserId: Meteor.userId(),
      delta: milestoneDelta,
      readBy: []
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
      milestoneId: issue.milestoneId,
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

    var issueDelta = delta(oldIssue, newIssue);

    var notification = _.extend(_.pick(notificationAttributes,
      'entity', 'action'), {
      teamId: newIssue.teamId,
      projectId: newIssue.projectId,
      milestoneId: newIssue.milestoneId,
      issueId: newIssue._id,
      name: newIssue.name,
      createdAt: new Date(),
      createdByUserId: Meteor.userId(),
      delta: issueDelta
    });

    var notificationId = Notifications.insert(notification);

    return Notifications.findOne(notificationId);
  }
});