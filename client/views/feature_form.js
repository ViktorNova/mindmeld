Template.createFeature.helpers(Meteor.userFunctions);
Template.editFeature.helpers(Meteor.userFunctions);
Template.featureForm.helpers(Meteor.userFunctions);

var dataContext;

Template.featureForm.rendered = function() {

  dataContext = this;

  var ownedByUserId = this.data.currentFeature && this.data.currentFeature.ownedByUserId;
  ownedByUserId = ownedByUserId || Meteor.userId();

  $(document).ready(function() { 
    $("#ownedByUserId").val(ownedByUserId);
    $("#ownedByUserId").select2({placeholder: 'Owner'}); 
  });
}

Template.featureForm.events({
  'blur #name-input': function(event) {
    Meteor.userFunctions.logFormEdit.call(this, event, Router.current().path);
  },
  'click #ownedByUserId': function(event) {
    Meteor.userFunctions.logFormEdit.call(this, event, Router.current().path);
  },
  'blur #detail': function(event) {
    Meteor.userFunctions.logFormEdit.call(this, event, Router.current().path);
  },




  'click #create': function(event) {
    event.preventDefault();

    if (!$('form#createFeature').parsley().validate())
      return;

    var feature = {
      teamId: $(document).find('[name=teamId]').val(),
      projectId: $(document).find('[name=projectId]').val(),
      name: $(document).find('[name=name]').val(),
      detail: $(document).find('[name=detail]').val(),
      ownedByUserId: $(document).find('[name=ownedByUserId]').val()
    }

    Meteor.call('createFeature', feature, function(error, feature) {
      if (error) {
        Meteor.userFunctions.addError(error.reason);
        return;
      } else {
        Router.go('feature', {
          teamCode: dataContext.data.teamCode,
          projectCode: dataContext.data.projectCode,
          featureCode: feature.code
        });
      }
    });
  },
  'click #edit': function(event) {
    event.preventDefault();

    if (!$('form#editFeature').parsley().validate())
      return;

    var feature = {
      _id: $(document).find('[name=_id]').val(),
      teamId: $(document).find('[name=teamId]').val(),
      projectId: $(document).find('[name=projectId]').val(),
      name: $(document).find('[name=name]').val(),
      detail: $(document).find('[name=detail]').val(),
      ownedByUserId: $(document).find('[name=ownedByUserId]').val()
    }

    Meteor.call('editFeature', feature, function(error, feature) {
      if (error) {
        Meteor.userFunctions.addError(error.reason);
        return;
      } else {
        Router.go('feature', {
          teamCode: dataContext.data.teamCode,
          projectCode: dataContext.data.projectCode,
          featureCode: feature.code
        });
      }
    });
  },
  'click #cancel-create': function(event) {
    event.preventDefault();
    Router.go('project', {teamCode: dataContext.data.teamCode, projectCode: dataContext.data.projectCode});
  },
  'click #cancel-edit': function(event) {
    Router.go('feature', {
      teamCode: dataContext.data.teamCode,
      projectCode: dataContext.data.projectCode,
      featureCode: dataContext.data.featureCode
    });
  }
});