Handlebars.registerHelper('capitalize', function(string) {
  return string.capitalize();
});

Handlebars.registerHelper('selected', function(text, expected) {
  console.log("?" + text + "/" + expected);
  return text == expected ? 'selected' : '';
});