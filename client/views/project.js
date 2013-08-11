Template.project.helpers(Meteor.userFunctions);
Template.projectButtons.helpers(_.extend(_.clone(Meteor.userFunctions), Meteor.formFunctions));
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
  },
  'click #deleteProject': function(event) {
    event.preventDefault();

    var projectId = $(document).find('[name=_id]').val();

    Meteor.call('deleteProject', projectId, function(error) {
      if (error) {
        Meteor.userFunctions.addError(error.reason);
        return;
      } else {
        var team = Meteor.userFunctions.currentTeam();
        Meteor.Router.to('team', Meteor.userFunctions.currentTeam().code);
      }
    })
  },

});