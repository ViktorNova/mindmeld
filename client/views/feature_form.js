Template.createFeature.helpers(Meteor.userFunctions);
Template.editFeature.helpers(Meteor.userFunctions);
Template.featureForm.helpers(_.extend(_.clone(Meteor.userFunctions), Meteor.formFunctions));

Template.featureForm.rendered = function() {

  var ownedByUserId = Meteor.userFunctions.currentFeature() && Meteor.userFunctions.currentFeature().ownedByUserId;
  ownedByUserId = ownedByUserId || Meteor.userId();

  $(document).ready(function() { 
    $("#ownedByUserId").val(ownedByUserId);
    $("#ownedByUserId").select2(); 
  });
}

Template.featureForm.events({
  'click #create': function(event) {
    event.preventDefault();

    var feature = {
      teamId: $(document).find('[name=teamId]').val(),
      projectId: $(document).find('[name=projectId]').val(),
      name: $(document).find('[name=name]').val(),
      detail: $(document).find('[name=detail]').val(),
      ownedByUserId: $(document).find('[name=ownedByUserId]').val()
    }

    Meteor.call('createFeature', feature, function(error, feature) {
      if (error) {
        //TODO: handle errors in notifications
        Meteor.Errors.throw(error.reason);
        //if feature already exists, go there
        if (error.error == 302)
          Meteor.Router.to('project', error.details)
      } else {
        var notificationAttributes = {
          entity: 'feature',
          action: 'create',
          feature: feature
        };

        Meteor.call('createFeatureNotification', notificationAttributes, function(error) {
          if (error) {
            console.log(error);
            //TODO: handle errors in notifications    
          }
          Meteor.Router.to('feature', 
            Meteor.userFunctions.teamCode.call(feature),
            Meteor.userFunctions.projectCode.call(feature),
            feature.code);
        });      
      }
    });
  },
  'click #edit': function(event) {
    event.preventDefault();

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
        //TODO: handle errors in notifications
        Meteor.Errors.throw(error.reason);
      } else {
        Meteor.Router.to('feature',
          Meteor.userFunctions.teamCode.call(feature),
          Meteor.userFunctions.projectCode.call(feature),
          feature.code);
      }
    });
  },
  'click #delete': function(event) {
    event.preventDefault();

    var featureId = $(document).find('[name=_id]').val();

    Meteor.call('deleteFeature', featureId, function(error) {
      if (error) {
        Meteor.Errors.throw(error.reason);
        //TOO: handle errors in notifications
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