Deps.autorun(function() {
  var movement = Movements.findOne({userId: SessionAmplify.get('following')});
  if (movement) {
    if (Router.current() && (Router.current().path != movement.path)) {
      var header = document.getElementById('header');
      if (header) {
        header.scrollIntoView();
        $('#prependedDropdownButton')
          .animate({backgroundColor: 'yellow'})
          .animate({backgroundColor: 'white'}, function() {
            Router.go(movement.path);
          });
      }
    }
  }
});