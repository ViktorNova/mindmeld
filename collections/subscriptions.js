Subscriptions = new Meteor.Collection('subscriptions');

Meteor.methods({
  subscribe: function(subscriptionAttributes) {
    if (!Subscriptions.findOne({email: subscriptionAttributes.email})) {
      var subscription = _.extend(_.pick(subscriptionAttributes,
        'name','email'), {
        createdAt: new Date()
      });

      Subscriptions.insert(subscription);
    }
  }
});