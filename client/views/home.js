Meteor.subscribeWithPagination('userTeams', Meteor.userId(), 5);
Meteor.subscribeWithPagination('userProjects', Meteor.userId(), 5);
Meteor.subscribeWithPagination('userFeatures', Meteor.userId(), 5);
Meteor.subscribeWithPagination('userIssues', Meteor.userId(), 5);


allIssuesNotStartedHandle = Meteor.subscribeWithPagination('allIssuesNotStarted', Meteor.userId(), 2);
allIssuesInProgressHandle = Meteor.subscribeWithPagination('allIssuesInProgress', Meteor.userId(), 2);
allIssuesCompletedHandle = Meteor.subscribeWithPagination('allIssuesCompleted', Meteor.userId(), 2);
allIssuesCancelledHandle = Meteor.subscribeWithPagination('allIssuesCancelled', Meteor.userId(), 2);

Template.home.helpers();
Template.homeBody.helpers({
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
      console.log("handled loaded" + allIssuesNotStartedHandle.loaded());
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
      return Issues.find({ status: 1, featureId: {$in: _.pluck(featuresOwnedByUser, '_id')}}).count();
    }
  },  
  allIssuesInProgressReady: function() {
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
  allIssuesCompletedCount: function() {
    var featuresOwnedByUser = Features.find({ownedByUserId: Meteor.userId()}).fetch();
    if (featuresOwnedByUser) 
      return Issues.find({ status: 2, featureId: {$in: _.pluck(featuresOwnedByUser, '_id')}}).count();
  },
  allIssuesCompletedReady: function() {
    return !allIssuesCompletedHandle.loading();
  },
  allIssuesCompletedLoaded: function() {
    var featuresOwnedByUser = Features.find({ownedByUserId: Meteor.userId()}).fetch();
    if (featuresOwnedByUser) {
      return !allIssuesCompletedHandle.loading() &&
      Issues.find({ status: 2, featureId: {$in: _.pluck(featuresOwnedByUser, '_id')}}).count() < allIssuesCompletedHandle.loaded();
    }
  },
  allIssuesCancelled: function() {
    var featuresOwnedByUser = Features.find({ownedByUserId: Meteor.userId()}).fetch();
    if (featuresOwnedByUser) 
      return Issues.find({ status: 3, featureId: {$in: _.pluck(featuresOwnedByUser, '_id')}});
  },
  allIssuesCancelledCount: function() {
    var featuresOwnedByUser = Features.find({ownedByUserId: Meteor.userId()}).fetch();
    if (featuresOwnedByUser) 
      return Issues.find({ status: 3, featureId: {$in: _.pluck(featuresOwnedByUser, '_id')}}).count();
  },
  allIssuesCancelledReady: function() {
    return !allIssuesCancelledHandle.loading();
  },
  allIssuesCancelledLoaded: function() {
    var featuresOwnedByUser = Features.find({ownedByUserId: Meteor.userId()}).fetch();
    if (featuresOwnedByUser) {
      return !allIssuesCancelledHandle.loading() &&
      Issues.find({ status: 3, featureId: {$in: _.pluck(featuresOwnedByUser, '_id')}}).count() < allIssuesCancelledHandle.loaded();
    }
  }
});

Template.issueInTable.helpers();

Template.home.events({
  'click #createTeam': function(event) {
    event.preventDefault();
    Meteor.Router.to('createTeam');
  }
});