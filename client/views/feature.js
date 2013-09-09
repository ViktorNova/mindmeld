Template.feature.helpers(Meteor.userFunctions);
Template.featureButtons.helpers(Meteor.userFunctions);
Template.issueLinks.helpers(Meteor.userFunctions);

Template.featureBody.helpers(Meteor.userFunctions);

var dataContext;

Template.featureButtons.rendered = function() {
  dataContext = this;
}

Template.featureButtons.events({
  'click #createIssue': function(event) {
    event.preventDefault();
    Router.go('createIssue', dataContext.data);
  },
  'click #editFeature': function(event) {
    event.preventDefault();
    Router.go('editFeature', dataContext.data);
  },
  'click #deleteFeature': function(event) {
    event.preventDefault();

    var featureId = $(document).find('[name=_id]').val();

    Meteor.call('deleteFeature', featureId, function(error) {
      if (error) {
        Meteor.userFunctions.addError(error.reason);
        return;
      } else {
        Router.go('project', {teamCode: dataContext.data.teamCode, projectCode: dataContext.data.projectCode});
      }
    })
  }

});