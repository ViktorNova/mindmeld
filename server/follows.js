Meteor.methods({
  followUserId: function(followingUserId) {
    if (followingUserId) {
      var follow = Follows.findOne({userId: Meteor.userId()});
      if (follow) {
        Follows.update({userId: Meteor.userId()},{$set: {followingUserId: followingUserId}});
      } else {
        Follows.insert({userId: Meteor.userId(), followingUserId: followingUserId});
      }
    } else {
      Follows.remove({userId: Meteor.userId()});
    }
  }
})