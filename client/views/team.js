Template.team.helpers(Meteor.userFunctions);
Template.teamButtons.helpers(_.extend(_.clone(Meteor.userFunctions), Meteor.formFunctions));
Template.projectLinks.helpers(_.extend({
  allProjects: function() {
    return Projects.find({teamId: Session.get('currentTeamId')},{sort: {statusChanged: -1}});
  }
},Meteor.userFunctions));

Template.teamBody.helpers(_.extend({
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
  'click #editTeam': function(event) {
    event.preventDefault();
    Meteor.Router.to('editTeam', this.code);
  },
  'click #inviteUser': function(event) {
    event.preventDefault();
    Meteor.Router.to('inviteUser', this.code);
  },
  'click #createProject': function(event) {
    event.preventDefault();
    Meteor.Router.to('createProject', this.code);
  },
});