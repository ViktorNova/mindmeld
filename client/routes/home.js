Router.map(function() {
  this.route('home',
  {
    path: '/',
    data: function() {
      var availableTeams = Teams.find({members: {$in: [Meteor.userId()]}});
      if (availableTeams.count() == 0)
        return null;
      return {
        availableTeams: availableTeams
      };
    },
    waitOn: Meteor.subscribe('userTeams', Meteor.userId()),
    controller: HomeController,
    action: 'userLoadedAction',
    loadingTemplate: 'waiting'
  });
});