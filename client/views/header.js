Template.header.rendered = function() {
  $(document).ready(function() { $("#following").select2(); });
};

Template.header.helpers(Meteor.userFunctions);

var following;
var followingListener = new Deps.Dependency();

var currentlyFollowing = Deps.autorun(function() {
  var movement = Movements.findOne({_id: Session.get('following')});
  console.log('movement is ' + movement);
}); 

Template.header.events({
  'click #following': function(event) {
    event.preventDefault();
    var following = $('#following>option:selected').text();
    Session.set('following', following);
  }
});