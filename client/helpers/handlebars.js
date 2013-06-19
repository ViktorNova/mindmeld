Handlebars.registerHelper('capitalize', function(string) {
  return string.capitalize();
});

Handlebars.registerHelper('iconify', function(action) {
  if (action === "create") {
    return "icon-ok-sign";
  }
  if (action === "edit") {
    return "icon-edit";
  }
});