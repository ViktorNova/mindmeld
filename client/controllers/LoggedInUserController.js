LoggedInUserController = RouteController.extend({
  userLoadedAction: function() {

    var router = this;

    Deps.autorun(function() {
      var movement = Movements.findOne({userId: SessionAmplify.get('following')});
      if (movement) {
        console.log(router.context.path);
        console.log(movement.path);
        if (router.context.path != movement.path) {
          console.log('going to ' + movement.path);
          Router.go(movement.path);
        } else {
          console.log('already there')
        }
      }
    });

    if (Meteor.loggingIn())
      return;

    if (Meteor.user()) {
      if (this.data()) {
        if (this.data().currentTeam) {
          var movementAttributes = {
            teamId: this.data().currentTeam._id,
            path: this.context.path
          };
          Meteor.call('logMovement', movementAttributes);
        }
      }

      this.render({
        userHeader: { 
          to: 'header', 
          data: function() {
            var otherMembers = null;
            if (this.data().currentTeam)
              otherMembers = Meteor.users.find({_id: {$in: _.without(this.data().currentTeam.members,Meteor.userId())}});
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