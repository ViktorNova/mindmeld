Template.team.helpers(Meteor.userFunctions);
Template.teamBody.helpers(_.extend({
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
  }

  },
  Meteor.userFunctions));

Template.teamBody.events({
  'click #createProject': function(event) {
    event.preventDefault();
    Meteor.Router.to('createProject', this.code);
  },
  'click #editTeam': function(event) {
    event.preventDefault();
    Meteor.Router.to('editTeam', this.code);
  }
});