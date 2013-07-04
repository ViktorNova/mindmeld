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

Meteor.Mindmeld.delta = function(oldItem, newItem) {
  var added = {};
  var removed = {};
  var changedFrom = {};
  var changedTo = {};

  var addedKeys = _.difference(_.keys(newItem), _.keys(oldItem));
  if (addedKeys) {
    added = 
      _.object(_.map(addedKeys, function(item) { return [item, newItem[item] ] }));
  }
  var removedKeys = _.difference(_.keys(oldItem), _.keys(newItem));
  if (removedKeys) {
    removed =
      _.object(_.map(removedKeys, function(item) { return [item, oldItem[item] ] }));
  }
  var sameKeys = _.intersection(_.keys(oldItem), _.keys(newItem));
  if (sameKeys) {
    _.each(sameKeys, function(sameKey) {
      if (oldItem[sameKey] instanceof Array && newItem[sameKey]) {
        if (_.difference(oldItem[sameKey], newItem[sameKey]).length) {
          changedFrom[sameKey] = oldItem[sameKey];
          changedTo[sameKey] = newItem[sameKey];
        }
      } else {
        if (oldItem[sameKey] !== newItem[sameKey]) {
          changedFrom[sameKey] = oldItem[sameKey];
          changedTo[sameKey] = newItem[sameKey];
        }
      }
    });
  }

  return {
    added: added,
    removed: removed,
    changedFrom: changedFrom,
    changedTo: changedTo
  }
};
