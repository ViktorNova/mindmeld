Router.map(function() {
  this.route('team',
  {
    path: '/:teamCode',
    data: function() {
      var currentTeam = Teams.findOne({code: this.params.teamCode});
      if (!currentTeam)
        return null;
      return {
        currentTeam: currentTeam, 
        availableProjects: Projects.find({teamId: currentTeam._id},{sort: {statusChanged: -1}}),
        teamMembers: Meteor.users.find({_id: {$in: currentTeam.members}})
      };
    },
    waitOn: [
      Meteor.subscribe('userTeams', Meteor.userId()),
      Meteor.subscribe('userProjects', Meteor.userId()),
      Meteor.subscribe('teamMembers', Meteor.userId())
    ],
    loadingTemplate: 'waiting',
    notFoundTemplate: 'notFound',
    template: 'team'
  });
});