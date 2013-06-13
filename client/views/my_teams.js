Template.myTeams.helpers({
  teamsIBelongTo: function() {
    return Teams.find({members: {$in:[Meteor.userId()]}});
  }
});
