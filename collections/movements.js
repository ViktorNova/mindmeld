Movements = new Meteor.Collection('movements');

Meteor.methods({
  logMovement: function(movementAttributes) {
    if (!Meteor.user())
      return;
    if (Movements.findOne({userId: Meteor.userId()})) {
      Movements.update(
        { userId : Meteor.userId() }, { 
          $set: {
            teamId: movementAttributes.teamId,
            template: movementAttributes.template,
            templatePathAttributes: movementAttributes.templatePathAttributes
          }
        });
    } else {
      Movements.insert( {
        userId: Meteor.userId(),
        teamId: movementAttributes.teamId,
        template: movementAttributes.template,
        templatePathAttributes: movementAttributes.templatePathAttributes
      });
    }
  }
});