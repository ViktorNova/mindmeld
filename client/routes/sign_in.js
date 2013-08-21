Router.map(function() {
  this.route('signIn',
  {
    path: '/signin',
    controller: SignInController,
    action: 'userLoadedAction'
  });
});