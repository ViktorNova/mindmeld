Template.notifications.helpers(Meteor.userFunctions);

Template.notification.helpers(_.extend(
  {
    isTeam: function() {
      return this.entity == "team";
    },
    isProject: function() {
      return this.entity == "project";
    },
    isFeature: function() {
      return this.entity == "feature";
    },
    isIssue: function() {
      return this.entity == "issue";
    }
  },
  Meteor.userFunctions)
);

Template.notification.events({
  'click .close': function(event) {
    event.preventDefault();
    Meteor.call('dismissNotification', event.target.dataset.item);
  }
})