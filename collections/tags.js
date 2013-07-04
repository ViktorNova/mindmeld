Tags = new Meteor.Collection('tags');

Meteor.methods({
  tagIncrement: function(teamId, tag) {
    var existingTag = Tags.findOne({teamId: teamId, tag: tag});
    if (existingTag) {
      Tags.update({teamId: teamId, tag: tag}, {$set: {count: existingTag.count + 1}});
    } else {
      Tags.insert({teamId: teamId, tag: tag, count: 1});
    }
  },
  tagDecrement: function(teamId, tag) {
    var existingTag = Tags.findOne({teamId: teamId, tag: tag});
    if (existingTag) {
      if (existingTag.count > 1)
        Tags.update({teamId: teamId, tag: tag}, {$set: {count: existingTag.count - 1}});
      else
        Tags.remove({teamId: teamId, tag: tag});
    }
  }
})