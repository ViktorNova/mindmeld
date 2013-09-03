//credit to http://www.foliotek.com/devblog/make-table-rows-sortable-using-jquery-ui-sortable/
var fixHelper = function(e, ui) {
  ui.children().each(function() {
    $(this).width($(this).width());
  });
  return ui;
};

Template.featureLinks.helpers(Meteor.userFunctions);
Template.projectBody.helpers(_.extend({
  renderNotStartedIssueByRankingTable: function() {
    var buffer = [];
    var notStartedIssues = this.notStartedIssuesInProject.fetch();
    this.notStartedIssuesInProject.rewind();
    _.each(notStartedIssues, function(element, index, list) {
      if (index == 0)
        buffer.push('<tr>');
      if (index > 1 && (index % 4 == 0))
        buffer.push('<tr>');
      buffer.push('<td id="' + element._id + '" class="no-table-cell-border quartet"><a href="' + Router.path('issue', Meteor.userFunctions.issueParams.call(element)) + '">' + (index + 1) + '</a>: ' + element.name + '</a></td>');
      if (index > 0 && (index + 1) % 4 == 0)
        buffer.push('</tr>');
    });
    if (notStartedIssues.length % 4 != 0)
      buffer.push('</tr>');
    return buffer.join('');
  }
}, Meteor.userFunctions));

var dataContext;

Template.projectBody.rendered = function() {

  dataContext = this;

  $(document).ready(function() { 
    $('#sortableIssueList').sortable({
      items: 'td',
      helper: fixHelper, 
      beforeStop: function(event, ui) {
        var rankedIssueIds = $(this).sortable('toArray');
        Meteor.call('reorderIssueRankings', rankedIssueIds, dataContext.data.currentTeam._id, dataContext.data.currentProject._id);
      }
    }).disableSelection();
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