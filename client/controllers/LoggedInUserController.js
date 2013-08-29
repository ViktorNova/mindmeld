LoggedInUserController = RouteController.extend({
  waitOn: function() {
    return [
      Meteor.subscribe('publicMembers'),
      Meteor.subscribe('publicTeams'),
      Meteor.subscribe('teamMembers', Meteor.userId()),
      Meteor.subscribe('teamMovements', Meteor.userId()),
      Meteor.subscribe('userFeatures', Meteor.userId()),
      Meteor.subscribe('userIssues', Meteor.userId()),
      Meteor.subscribe('userNotifications', Meteor.userId()),
      Meteor.subscribe('userProjects', Meteor.userId()),
      Meteor.subscribe('userTags', Meteor.userId()),
      Meteor.subscribe('userTeams', Meteor.userId()),
      Meteor.subscribe('ownTeamInvites', Meteor.user() && Meteor.user().username),
      Meteor.subscribe('teamInvites', Meteor.userId())
    ];
  },
  userLoadedAction: function() {

    var router = this;

    Deps.autorun(function() {
      var movement = Movements.findOne({userId: SessionAmplify.get('following')});
      if (movement) {
        if (router.context.path != movement.path) {
          document.getElementById('header').scrollIntoView();
          $('#prependedDropdownButton').animate({backgroundColor: 'yellow'}).animate({backgroundColor: 'white'});
          Router.go(movement.path);
        }
      }
    });

    if (Meteor.loggingIn())
      return;

    if (Meteor.user()) {
      var routeData = this.data();
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
              otherMembers = Meteor.users.find({_id: {$in: _.without(routeData.currentTeam.members,Meteor.userId())}});
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