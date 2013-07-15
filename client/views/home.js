Template.home.helpers();
Template.homeBody.helpers({
  allIssuesNotStarted: function() {
    return Issues.find({status: 0});
  },
  allIssuesNotStartedCount: function() {
    return Issues.find({status: 0}).count();
  },
  allIssuesNotStartedReady: function() {
    return !allIssuesNotStartedHandle.loading();
  },
  allIssuesNotStartedLoaded: function() {
    return !allIssuesNotStartedHandle.loading() && Issues.find({status: 0}).count() < allIssuesNotStartedHandle.loaded();
  },
  // allIssuesInProgress: function() {
  //   return Issues.find({status: 1});
  // },
  // allIssuesInProgressCount: function() {
  //   return Issues.find({status: 1}).count();
  // },  
  // allIssuesInProgressReady: function() {
  //   return !allIssuesInProgressHandle.loading();
  // },
  // allIssuesInProgressLoaded: function() {
  //   return !allIssuesInProgressHandle.loading() && Issues.find({status: 1}).count() < allIssuesInProgressHandle.loaded();
  // },
  // allIssuesCompleted: function() {
  //   return Issues.find({status: 2});
  // },
  // allIssuesCompletedCount: function() {
  //   return Issues.find({status: 2});
  // },
  // allIssuesCompletedReady: function() {
  //   return !allIssuesCompletedHandle.loading();
  // },
  // allIssuesCompletedLoaded: function() {
  //   return !allIssuesCompletedHandle.loading() && Issues.find({status: 2}).count() < allIssuesCompletedHandle.loaded();
  // },
  // allIssuesCancelled: function() {
  //   return Issues.find({status: 3});
  // },
  // allIssuesCancelledCount: function() {
  //   return Issues.find({status: 3}).count();
  // },
  // allIssuesCancelledReady: function() {
  //   return !allIssuesCancelledHandle.loading();
  // },
  // allIssuesCancelledLoaded: function() {
  //   return !allIssuesCancelledHandle.loading() && Issues.find({status: 3}).count() < allIssuesCancelledHandle.loaded();
  // }
});

Template.issueInTable.helpers(Meteor.userFunctions);

Template.home.events({
  'click #not-started-load-more': function(event) {
    event.preventDefault();
    console.log("!");
    allIssuesNotStartedHandle.loadNextPage();
  },
  'click #createTeam': function(event) {
    event.preventDefault();
    Meteor.Router.to('createTeam');
  }
});