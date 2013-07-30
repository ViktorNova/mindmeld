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

Handlebars.registerHelper('disableButtonIfNot',function(condition) {
  return (!condition) ? " disabled " : ""; 
});

Handlebars.registerHelper('disableButtonIfNot2',function(condition, condition2) {
  return (!(condition ||condition2)) ? " disabled " : ""; 
});


Handlebars.registerHelper('pastTense', function(action, oldStatus, newStatus) {
  if (action === "create") {
    return "created";
  }
  if (action === "edit") {
    return "edited";
  }
  if (action === "delete") {
    return "deleted";
  }
  if (action === "status") {
    if (newStatus == 1) {
      if (oldStatus == 0)
        return "started working on";
      if (oldStatus == 1)
        return "started working on";
      if (oldStatus == 2)
        return "restarted working on";
      if (oldStatus == 3)
        return "restarted working on";
    }
    if (newStatus == 2) {
      return "completed working on";
    }
    if (newStatus == 3) {
      return "cancelled working on";  
    }
    return "statused";
  }
});