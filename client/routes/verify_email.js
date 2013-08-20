Router.map(function() {
  this.route('verifyEmail',
  { 
    path: '/verify-email/:token',
    controller: VerifyEmailController,
    action: 'tokenValidAction'
  });
  this.route('feature',{});
});