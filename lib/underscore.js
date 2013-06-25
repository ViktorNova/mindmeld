//credit to: http://stackoverflow.com/questions/14058193/remove-empty-properties-falsy-values-from-object-with-underscore-js

_.mixin({
  compactObject: function(o) {
    _.each(o, function(v, k) {
      if (!v)
        delete o[k];
    });
    return o;
  }
});