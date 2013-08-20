Router.map(function() {
  this.route('signIn',
  {
    path: '/signin',
    data: function() {
      var user = Meteor.user();
      if (!user)
        return null;
      return {};
    },
    waitOn: Meteor.subscribe('userTeams', Meteor.userId()),
    loadingTemplate: 'waiting',
    notFoundTemplate: 'signIn',
    template: 'home'
  });
});