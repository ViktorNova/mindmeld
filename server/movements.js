Meteor.methods({
  logMovement: function(movementAttributes) {
    if (!Meteor.user())
      return;
    if (Movements.findOne({userId: Meteor.userId()})) {
      Movements.update(
        { userId : Meteor.userId() }, { 
          $set: {
            teamId: movementAttributes.teamId,
            path: movementAttributes.path,
            updatedAt: new Date()
          }
        });
    } else {
      Movements.insert( {
        userId: Meteor.userId(),
        teamId: movementAttributes.teamId,
        path: movementAttributes.path,
        updatedAt: new Date()
      });
    }
  }
});