Template.featureLinks.helpers({
  allFeatures: function() {
    return Features.find({
      teamId: Session.get('currentTeamId'),
      projectId: Session.get('currentProjectId')
    },{sort: {updatedAt: -1}});
  }  
});

Template.projectBody.helpers({
  notStartedIssuesByRanking: function() {
    return Issues.find({ teamId: this.teamId, projectId: this._id, status: 0, rank: {$exists: true} },{sort: {rank: 1}});
  }
});

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
    Router.go('createFeature', {teamCode: this.currentTeamCode, projectCode: this.currentProjectCode});
  },
  'click #editProject': function(event) {
    event.preventDefault();
    Router.go('editProject', {teamCode: this.currentTeamCode, projectCode: this.currentProjectCode});
  },
  'click #deleteProject': function(event) {
    event.preventDefault();
    var projectId = $(document).find('[name=_id]').val();

    var dataContext = this;

    Meteor.call('deleteProject', projectId, function(error) {
      if (error) {
        Meteor.userFunctions.addError(error.reason);
        return;
      } else {
        console.log(dataContext);
        Router.go('team', {teamCode: dataContext.currentTeamCode});
      }
    })
  },

});