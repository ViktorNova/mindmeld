Template.featureLinks.helpers(Meteor.userFunctions);
Template.projectBody.helpers(Meteor.userFunctions);

var dataContext;

Template.projectBody.rendered = function() {

  dataContext = this;

  $(document).ready(function() { 
    $('#sortableIssueList').sortable({ 
      axis: "y",
      beforeStop: function(event, ui) {
        var rankedIssueIds = $( "#sortableIssueList" ).sortable( "toArray" );
        Meteor.call('reorderIssueRankings', rankedIssueIds, this.currentTeam._id, this.currentProject._id);
      }
    });
    $('#sortableIssueList').disableSelection();
  });
};

Template.projectBody.events({
  'click #createFeature': function(event) {
    event.preventDefault();
    Router.go('createFeature', {teamCode: dataContext.data.teamCode, projectCode: dataContext.data.projectCode});
  },
  'click #editProject': function(event) {
    event.preventDefault();
    Router.go('editProject', {teamCode: dataContext.data.teamCode, projectCode: dataContext.data.projectCode});
  },
  'click #deleteProject': function(event) {
    event.preventDefault();
    var projectId = $(document).find('[name=_id]').val();

    Meteor.call('deleteProject', projectId, function(error) {
      if (error) {
        Meteor.userFunctions.addError(error.reason);
        return;
      } else {
        Router.go('team', {teamCode: dataContext.data.teamCode});
      }
    })
  },

});