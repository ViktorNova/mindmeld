Deps.autorun(function() {

  Meteor.subscribe('userMovements', Meteor.userId(), SessionAmplify.get('following'));

  var movement = Movements.findOne({userId: SessionAmplify.get('following')});
  if (movement) {
    if (Router.current() && (Router.current().path != movement.path)) {
      var header = document.getElementById('header');
      if (header) {
        header.scrollIntoView();
        $('#prependedDropdownButton')
          .animate({backgroundColor: 'yellow'})
          .animate({backgroundColor: 'white'});
        Router.go(movement.path);
      }
    }
  }

  Meteor.subscribe('userFollowers', Meteor.userId());

  Meteor.subscribe('userFormEdits', Meteor.userId(), SessionAmplify.get('following'));

  var formEdit = FormEdits.findOne({userId: SessionAmplify.get('following')});
  if (formEdit) {
    if (Router.current() && Router.current().path == formEdit.path) {
      var element = $('#' + formEdit.element);
      if (element) {
        if (element.length > 0 && element[0].id == 'tags') {
          element.select2('val',formEdit.value);
          return;
        }
        if (element.is("select")) {
          element.select2("val",formEdit.value);
        } else {
          element
            .animate({backgroundColor: 'yellow'})
            .animate({backgroundColor: 'white'})
            .val(formEdit.value);
        }
      }
    }
  }
});