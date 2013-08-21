Router.map(function() {
  this.route('user',
  {
    path: '/users/:username',
    data: function() {
      return {};
    },
    loadingTemplate: 'waiting',
    notFoundTemplate: 'notFound',
    template: 'user'
  });
});