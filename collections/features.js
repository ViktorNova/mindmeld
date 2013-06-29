Features = new Meteor.Collection('features');

Meteor.methods({
  createFeature: function(featureAttributes) {
    var user = Meteor.user();
    if (!user)
      throw new Meteor.Error(401, "You need to login to create a feature");
    //todo: validation
    //validate name to max 80 chars

    var feature = _.extend(_.pick(featureAttributes, 
      'teamId', 'projectId', 'name', 'detail', 'ownedByUserId'), {
      code: featureAttributes.name.toCode(),
      createdByUserId: Meteor.userId()
    });

    var featureId = Features.insert(feature);
    return Features.findOne(featureId);
  },
  editFeature: function(featureAttributes) {
    var user = Meteor.user();
    if (!user)
      throw new Meteor.Error(401, "You need to login to edit a feature");
    //todo: validation
    //validate name to max 80 chars

    var feature = _.extend(_.pick(featureAttributes, '_id', 'teamId', 
      'projectId', 'name', 'detail', 'ownedByUserId'), {
      code: featureAttributes.name.toCode(),
    });

    var oldFeature = Features.findOne(feature._id);    

    Features.update( { _id: feature._id }, { $set: {
      teamId: feature.teamId,
      projectId: feature.projectId,
      name: feature.name,
      detail: feature.detail,
      code: feature.code,
      ownedByUserId: feature.ownedByUserId
    }});

    Issues.update( { 
      teamId: feature.teamId, projectId: 
      feature.projectId, 
      featureId: feature._id, 
      ownedByUserId: oldFeature.ownedByUserId 
    }, { 
      $set: { ownedByUserId: feature.ownedByUserId }
    },
    { multi: true });

    var newFeature = Features.findOne(feature._id);

    var notificationAttributes = {
      entity: 'feature', 
      action: 'edit', 
      oldFeature: oldFeature,
      newFeature: newFeature
    };

    Meteor.call('editFeatureNotification', notificationAttributes, function(error, notification) {
      if (error) {
        console.log(error);
        //TODO: handle errors in notifications
      }
    });

    return newFeature;
  },
  deleteFeature: function(featureId) {
    var user = Meteor.user();
    if (!user)
      throw new Meteor.Error(401, "You need to login to delete a feature");

    Features.remove( { _id: featureId });
    Issues.remove( { featureId: featureId });
    Notifications.remove( { featureId: featureId });
  }
});
