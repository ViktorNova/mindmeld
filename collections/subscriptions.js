Subscriptions = new Meteor.Collection('subscriptions');

Meteor.methods({
  subscribe: function(subscription) {
    if (!Subscriptions.findOne({email: subscription.email})) {
      Subscriptions.insert(subscription);
    }
  }
});