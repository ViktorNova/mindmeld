function delta(oldItem, newItem) {
  console.log("hi");
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
    changedFrom =
      _.object(_.map(sameKeys, function(item) { return [item, oldItem[item] ] }));
    changedTo =
      _.object(_.map(sameKeys, function(item) { return [item, newItem[item] ] }));
  }

  return {
    added: added,
    removed: removed,
    changedFrom: changedFrom,
    changedTo: changedTo
  }
}