notStartedPageCount = 5;
inProgressPageCount = 5;
completedPageCount = 5;
cancelledPageCount = 5;

Template.home.helpers();
Template.teamLinks.helpers(_.extend({
  teamsIBelongTo: function() {
    return Teams.find({members: {$in:[Meteor.userId()]}});
  }
}, Meteor.userFunctions));

Template.homeBody.helpers(_.extend({
  allIssuesNotStarted: function() {
    return Issues.find({status: 0},{sort: {statusChanged: -1}});
  },
  allIssuesInProgress: function() {
    return Issues.find({status: 1},{sort: {statusChanged: -1}});
  },
  allIssuesCompleted: function() {
    return Issues.find({status: 2},{sort: {statusChanged: -1}});
  },
  allIssuesCancelled: function() {
    return Issues.find({status: 3},{sort: {statusChanged: -1}});
  },
  allIssuesNotStartedCount: function() {
    return Issues.find({status: 0},{sort: {statusChanged: -1}}).count();
  },
  allIssuesInProgressCount: function() {
    return Issues.find({status: 1},{sort: {statusChanged: -1}}).count();
  },
  allIssuesCompletedCount: function() {
    return Issues.find({status: 2},{sort: {statusChanged: -1}}).count();
  },
  allIssuesCancelledCount: function() {
    return Issues.find({status: 3},{sort: {statusChanged: -1}}).count();
  }
},Meteor.userFunctions));

Template.issueInTable.helpers(_.extend({
  displayIndex: function() {
    return this.toString();
  }
}, Meteor.userFunctions));

Template.home.events({
  'click #more-not-started': function(event) {
    event.preventDefault();
    notStartedPageCount += 5;
    refreshPaginatedTable('.not-started .issue-with-status', '#not-started-footer', notStartedPageCount);
  },
  'click #more-in-progress': function(event) {
    event.preventDefault();
    inProgressPageCount += 5;
    refreshPaginatedTable('.in-progress .issue-with-status', '#in-progress-footer', inProgressPageCount);
  },
  'click #more-completed': function(event) {
    event.preventDefault();
    completedPageCount += 5;
    refreshPaginatedTable('.completed .issue-with-status', '#completed-footer', completedPageCount);
  },
  'click #more-cancelled': function(event) {
    event.preventDefault();
    cancelledPageCount += 5;
    refreshPaginatedTable('.cancelled .issue-with-status', '#cancelled-footer', cancelledPageCount);
  },  
  'click #createTeam': function(event) {
    event.preventDefault();
    Router.go('createTeam');
  },
  'click #accept': function(event) {
    event.preventDefault();
    Meteor.call('acceptUsernameInvite', event.target.dataset.inviteid, function(error, teamCode) {
      if (error) {
        Meteor.userFunctions.addError(error.reason);
        return;
      }
      Meteor.Router.to(Meteor.Router.teamPath(teamCode));
    });
  },
  'click #decline': function(event) {
    event.preventDefault();
    Meteor.call('declineUsernameInvite', event.target.dataset.inviteid, function(error) {
      if (error) {
        Meteor.userFunctions.addError(error.reason);
        return;
      }
    });
  }
});

function refreshPaginatedTable(itemRowClassSelector, moreRowSelector, pageCount) {
  var s = $(itemRowClassSelector);
  //$(moreRowSelector)[0].hidden = false;
  for (var i = 0; i < pageCount; i++) {
    if (s[i])
      $(s[i]).show('fast');
  }

  for (var i = pageCount; i < s.length; i++) {
    if (s[i])
      $(s[i]).hide();
  }

  if (pageCount >= s.length) {
    if ($(moreRowSelector)[0])
      $(moreRowSelector)[0].hidden = true;
  }
}

Template.homeBody.rendered = function() {
  refreshPaginatedTable('.not-started .issue-with-status', '#not-started-footer', notStartedPageCount);
  refreshPaginatedTable('.in-progress .issue-with-status', '#in-progress-footer', inProgressPageCount);
  refreshPaginatedTable('.completed .issue-with-status', '#completed-footer', completedPageCount);
  refreshPaginatedTable('.cancelled .issue-with-status', '#cancelled-footer', cancelledPageCount);
};