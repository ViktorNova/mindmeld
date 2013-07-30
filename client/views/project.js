Template.project.helpers(Meteor.userFunctions);
Template.featureLinks.helpers(_.extend({
  allFeatures: function() {
    return Features.find({
      teamId: Session.get('currentTeamId'),
      projectId: Session.get('currentProjectId')
    },{sort: {updatedAt: -1}});
  }  
}, Meteor.userFunctions));
Template.projectBody.helpers(_.extend({
  notStartedIssuesByRanking: function() {
    return Issues.find({ teamId: this.teamId, projectId: this._id, status: 0, rank: {$exists: true} },{sort: {rank: 1}});
  }
}, Meteor.userFunctions));

Template.projectBody.rendered = function() {

  $(document).ready(function() { 
    $('#sortableIssueList').sortable({ 
      axis: "y",
      beforeStop: function(event, ui) {
        var rankedIssueIds = $( "#sortableIssueList" ).sortable( "toArray" );
        Meteor.call('reorderIssueRankings', rankedIssueIds, Meteor.userFunctions.currentTeam()._id, Meteor.userFunctions.currentProject()._id);
      }
    });
    $('#sortableIssueList').disableSelection();
  });
};

Template.projectBody.events({
  'click #createFeature': function(event) {
    event.preventDefault();
    Meteor.Router.to('createFeature', 
      Meteor.userFunctions.teamCode.call(this),
      this.code);
  },
  'click #editProject': function(event) {
    event.preventDefault();
    Meteor.Router.to('editProject', 
      Meteor.userFunctions.teamCode.call(this), 
      this.code);
  }
});