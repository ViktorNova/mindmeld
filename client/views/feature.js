var allIssuesSub;

// Deps.autorun(function() {
//   allIssuesSub = Meteor.subscribeWithPagination('teamIssues', Session.get('currentTeamId'), 5);
// });

Template.feature.helpers(Meteor.userFunctions);
Template.featureBody.helpers(_.extend({
  allIssues: function() {
    console.log("allIssuesSub is " + allIssuesSub.loaded());
    var issues = Issues.find({
      teamId: Session.get('currentTeamId'),
      projectId: Session.get('currentProjectId'),
      featureId: Session.get('currentFeatureId')
    },{sort: {statusChanged: -1}});
    console.log(issues.count());
    return issues;
  }
},Meteor.userFunctions));

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
  }
});