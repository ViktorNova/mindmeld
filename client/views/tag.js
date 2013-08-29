Template.tag.helpers(Meteor.userFunctions);
Template.tagBody.helpers(_.extend({
  // notStartedIssuesWithTag: function() {
  //   return Issues.find({teamId: Session.get('currentTeamId'), status: 0, tags: {$in: [Session.get('currentTag')]}},{sort: {rank: 1}});
  // },
  // inProgressIssuesWithTag: function() {
  //   return Issues.find({teamId: Session.get('currentTeamId'), status: 1, tags: {$in: [Session.get('currentTag')]}},{sort: {statusChanged: -1}});
  // },
  // completedIssuesWithTag: function() {
  //   return Issues.find({teamId: Session.get('currentTeamId'), status: 2, tags: {$in: [Session.get('currentTag')]}},{sort: {statusChanged: -1}});
  // },
  // cancelledIssuesWithTag: function() {
  //   return Issues.find({teamId: Session.get('currentTeamId'), status: 3, tags: {$in: [Session.get('currentTag')]}},{sort: {statusChanged: -1}});
  // },
  // notStartedIssuesWithTagCount: function() {
  //   return Issues.find({teamId: Session.get('currentTeamId'), status: 0, tags: {$in: [this.tag]}}).count();
  // },
  // inProgressIssuesWithTagCount: function() {
  //   return Issues.find({teamId: Session.get('currentTeamId'), status: 1, tags: {$in: [this.tag]}}).count();
  // },
  // completedIssuesWithTagCount: function() {
  //   return Issues.find({teamId: Session.get('currentTeamId'), status: 2, tags: {$in: [this.tag]}}).count();
  // },
  // cancelledIssuesWithTagCount: function() {
  //   return Issues.find({teamId: Session.get('currentTeamId'), status: 3, tags: {$in: [this.tag]}}).count();
  // }
},Meteor.userFunctions));