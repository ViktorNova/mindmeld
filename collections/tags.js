Tags = new Meteor.Collection('tags');

Meteor.methods({
  getTagId: function(tagCode) {
    if (!tagCode)
      return "NOTFOUND";

    console.log("looking for code " + tagCode);
    var tag = Tags.findOne({code: tagCode});
    if (tag) {
      return tag._id;
    } else {
      return "NOTFOUND";
    }
  },
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