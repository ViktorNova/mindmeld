Issues = new Meteor.Collection('issues');

Meteor.methods({
	insert: function(issueAttributes) {
    console.log("here");
    var user = Meteor.user();
    if (!user)
      throw new Meteor.Error(401, "You need to login to create an issue");
    //todo: validation
    //validate title to max 80 chars

    var issue = _.extend(_.pick(issueAttributes, 
      'teamId', 'projectId', 'milestoneId', 'title', 'detail', 
      'ownerUserId', 'assigneeUserId'), {
      code: issueAttributes.title.toCode(),
      createdByUserId: Meteor.userId(),
      ranking: 0
    });

    var issueId = Issues.insert(issue);
    return Issues.findOne(issueId);
  }
});