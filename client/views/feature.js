Template.feature.helpers(Meteor.userFunctions);
Template.featureButtons.helpers(_.extend(_.clone(Meteor.userFunctions), Meteor.formFunctions));
Template.issueLinks.helpers(_.extend({
  allIssues: function() {
    var issues = Issues.find({
      teamId: Session.get('currentTeamId'),
      projectId: Session.get('currentProjectId'),
      featureId: Session.get('currentFeatureId')
    },{sort: {statusChanged: -1}});
    return issues;
  }
}, Meteor.userFunctions));

Template.featureBody.helpers(Meteor.userFunctions);

Template.featureBody.events({
  'click #createIssue': function(event) {
    event.preventDefault();
    Meteor.Router.to('createIssue', 
      Meteor.userFunctions.teamCode.call(this),
      Meteor.userFunctions.projectCode.call(this),
      this.code);
  },
  'click #editFeature': function(event) {
    event.preventDefault();
    Meteor.Router.to('editFeature', 
      Meteor.userFunctions.teamCode.call(this),
      Meteor.userFunctions.projectCode.call(this),
      this.code);
  },
  'click #deleteFeature': function(event) {
    event.preventDefault();

    var featureId = $(document).find('[name=_id]').val();

    Meteor.call('deleteFeature', featureId, function(error) {
      if (error) {
        Meteor.userFunctions.addError(error.reason);
        return;
      } else {
        var project = Meteor.userFunctions.currentProject();
        Meteor.Router.to('project', 
          Meteor.userFunctions.teamCode.call(project),
          project.code
        );
      }
    })
  }

});