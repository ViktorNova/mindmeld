Meteor.bindUserSubscriptions = function() {
  Meteor.userSubscriptions = [
    Meteor.subscribe('userTeams', Meteor.userId()),
    Meteor.subscribe('userIssues', Meteor.userId()),
    Meteor.subscribe('userComments', Meteor.userId()),
    Meteor.subscribe('userFeatures', Meteor.userId()),
    Meteor.subscribe('userProjects', Meteor.userId()),
    //Meteor.subscribe('publicMembers'),
    Meteor.subscribe('userTags', Meteor.userId()),
    Meteor.subscribe('publicTeams'),
    Meteor.subscribe('teamMembers', Meteor.userId()),
    // Meteor.subscribe('teamMovements', Meteor.userId()),
    // Meteor.subscribe('teamFormEdits', Meteor.userId()),
    Meteor.subscribe('userNotifications', Meteor.userId()),
    Meteor.subscribe('ownUsernameTeamInvites', Meteor.user() && Meteor.user().username),
    Meteor.subscribe('ownEmailTeamInvites', Meteor.user() && Meteor.user().emails[0].address),
    Meteor.subscribe('teamInvites', Meteor.userId()),
    Meteor.subscribe('userFollowers', Meteor.userId())
  ];
}

Meteor.bindUserSubscriptions();

LoggedInUserController = RouteController.extend({
  waitOn: function() {
    return Meteor.userSubscriptions;
  },
  userLoadedAction: function() {

    var router = this;

    if (Meteor.loggingIn())
      return;

    var routeData = this.data();
    if (Meteor.user()) {
      if (routeData && routeData.currentTeam) {
        var movementAttributes = {
          teamId: routeData.currentTeam._id,
          path: this.context.path
        };
        Meteor.call('logMovement', movementAttributes);
      }
      this.render({
        userHeader: { 
          to: 'header', 
          data: function() {
            var otherMembers = null;
            if (routeData && routeData.currentTeam && routeData.currentTeam.members) {
              var otherMemberIds = _.without(routeData.currentTeam.members,Meteor.userId());
              var followers = Follows.find({followingUserId: Meteor.userId()}).fetch();
              var followerIds = _.pluck(followers,'userId');
              otherMemberIds = _.difference(otherMemberIds, followerIds);
              otherMembers = Meteor.users.find({_id: {$in: otherMemberIds}});
            }
            return {
              otherMembers: otherMembers,
              username: Meteor.user().username
            }
          }
        }
      });
      if (Meteor.user().emails[0].verified) {
        this.render(this.route.options.userFoundTemplate);
      } else {
        this.render('emailNotVerified');
      }
    } else {
      this.render(this.route.options.userNotFoundTemplate);
      this.render({
        publicHeader: { to: 'header'}
      });
    }
  } 
});