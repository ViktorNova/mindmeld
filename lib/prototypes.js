String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.toCode = function() {
  var code = this
    .toLowerCase()
    .replace(/\W/g,' ')
    .replace(/([^ \t]+)/g, function(_, word) {
        return word.capitalize(); }
      )
    .replace(/\W/g,'');


  return code.charAt(0).toLowerCase() + code.slice(1);
};