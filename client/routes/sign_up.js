Router.map(function() {
  this.route('signUp',
  {
    path: '/signup',
    controller: SignUpController,
    action: 'userLoadedAction'
  });
});