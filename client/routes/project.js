Router.map(function() {
  this.route ('project', 
  { 
    path: '/:teamCode/:projectCode',
    data: function() {
      var currentTeam = Teams.findOne({code: this.params.teamCode});
      var currentProject = Projects.findOne({code: this.params.projectCode});
      if (!currentTeam || !currentProject)
        return null;

      var availableFeatures = Features.find({
          teamId: currentTeam._id,
          projectId: currentProject._id
        },
        {sort: {statusChanged: -1}}
      );

      return {
        currentTeam: currentTeam,
        currentProject: currentProject,
        availableFeatures: availableFeatures
      }
    },
    waitOn: [
      Meteor.subscribe('userTeams', Meteor.userId()),
      Meteor.subscribe('userProjects', Meteor.userId()),
      Meteor.subscribe('userFeatures', Meteor.userId())
    ],
    loadingTemplate: 'waiting',
    notFoundTemplate: 'notFound',
    template: 'project'
  });
});