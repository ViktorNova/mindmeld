Meteor.Mindmeld = {};

Meteor.Mindmeld.statusEnum = {
  notStarted: { value: 0, key: 'notStarted', display: 'Not Started'},
  inProgress: { value: 1, key: 'inProgress', display: 'In Progress'},
  completed: { value: 2, key: 'completed', display: 'Completed'},
  cancelled: { value: 3, key: 'cancelled', display: 'Cancelled'},  
};

Meteor.Mindmeld.toStatusEnum = function(value) {
  return _.findWhere(_.values(Meteor.Mindmeld.statusEnum), {value: value});
};