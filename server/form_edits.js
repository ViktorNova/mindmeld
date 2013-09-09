Meteor.methods({
  logFormEdit: function(formEditAttributes) {
    if (!Meteor.user())
      return;
    if (FormEdits.findOne({userId: Meteor.userId()})) {
      FormEdits.update(
        { userId: Meteor.userId() }, {
        $set: {
          teamId: formEditAttributes.teamId,
          element: formEditAttributes.element,
          value: formEditAttributes.value,
          path: formEditAttributes.path,
          updatedAt: new Date()
        }
      });
    } else {
      FormEdits.insert({
        userId: Meteor.userId(),
        teamId: formEditAttributes.teamId,
        element: formEditAttributes.element,
        value: formEditAttributes.value,
        path: formEditAttributes.path,
        updatedAt: new Date()
      });
    }
  }
});