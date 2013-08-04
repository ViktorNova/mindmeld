Meteor.methods({
  createFeature: function(featureAttributes) {
    var user = Meteor.user();
    if (!user)
      throw new Meteor.Error(401, "You need to login to create a feature");

    var feature = _.extend(_.pick(featureAttributes, 
      'teamId', 'projectId', 'name', 'detail', 'ownedByUserId'), {
      code: featureAttributes.name.toCode(),
      upperCaseCode: featureAttributes.name.toCode().toUpperCase(),
      createdByUserId: Meteor.userId(),
      updatedAt: new Date()
    });

    if (!Teams.findOne({_id: feature.teamId, members: {$in:[Meteor.userId()]}}))
      throw new Meteor.Error(403, "The team specified could not be found");

    if (!Teams.findOne({_id: feature.teamId, members: {$in:[feature.ownedByUserId]}}))
      throw new Meteor.Error(403, "The owner specified was not found in the team specified");

    if (feature.name.length < 3 || feature.name.length > 30)
      throw new Meteor.Error(403, "Feature name must be between 3 and 30 characters");

    if (feature.detail.length < 3 || feature.detail.length > 1000)
      throw new Meteor.Error(403, "Feature description must be between 3 and 1000 characters");

    if (Features.findOne({teamId: feature.teamId, projectId: feature.projectId, upperCaseCode: feature.upperCaseCode}))
      throw new Meteor.Error(403, "Feature name already exists");

    var featureId = Features.insert(feature);
    var newFeature = Features.findOne(featureId);
    
    var notificationAttributes = {
      entity: 'feature',
      action: 'create',
      feature: newFeature
    };

    Meteor.call('createFeatureNotification', notificationAttributes);

    return Features.findOne(featureId);


  },
  editFeature: function(featureAttributes) {
    var user = Meteor.user();
    if (!user)
      throw new Meteor.Error(401, "You need to login to edit a feature");

    var feature = _.extend(_.pick(featureAttributes, '_id', 'teamId', 'projectId', 'name', 'detail', 'ownedByUserId'), {
      code: featureAttributes.name.toCode(),
      upperCaseCode: featureAttributes.name.toCode().toUpperCase()
    });

    if (!Teams.findOne({_id: project.teamId, members: {$in:[Meteor.userId()]}}))
      throw new Meteor.Error(403, "The team specified could not be found");

    if (!Teams.findOne({_id: feature.teamId, members: {$in:[feature.ownedByUserId]}}))
      throw new Meteor.Error(403, "The owner specified was not found in the team specified");

    if (feature.name.length < 3 || feature.name.length > 30)
      throw new Meteor.Error(403, "Feature name must be between 3 and 30 characters");

    if (feature.detail.length < 3 || feature.detail.length > 1000)
      throw new Meteor.Error(403, "Feature description must be between 3 and 1000 characters");

    var oldFeature = Features.findOne(feature._id);    

    if (feature.upperCaseCode != oldFeature.upperCaseCode && Features.findOne({teamId: feature.teamId, projectId: feature.projectId, upperCaseCode: feature.upperCaseCode}))
      throw new Meteor.Error(403, "Feature name already exists");

    Features.update( { _id: feature._id }, { $set: {
      teamId: feature.teamId,
      projectId: feature.projectId,
      name: feature.name,
      detail: feature.detail,
      code: feature.code,
      upperCaseCode: feature.upperCaseCode,
      ownedByUserId: feature.ownedByUserId,
      updatedAt: new Date()
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

    Meteor.call('editFeatureNotification', notificationAttributes);

    return newFeature;
  },
  deleteFeature: function(featureId) {
    var user = Meteor.user();
    if (!user)
      throw new Meteor.Error(401, "You need to login to delete a feature");

    var teamIdsUserBelongs = _.pluck(Teams.find({members: {$in:[Meteor.userId()]}}).fetch(),'_id');

    var validFeature = Features.findOne({_id: featureId, teamId: {$in:teamIdsUserBelongs}});

    if (!validFeature)
      throw new Meteor.Error(403, "Could not find a matching feature that you are authorized to delete");

    Features.remove( { _id: featureId });
    Issues.remove( { featureId: featureId });
    Notifications.remove( { featureId: featureId });
  }
});
