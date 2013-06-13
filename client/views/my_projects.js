Template.myProjects.helpers({
  projectsIBelongTo: function() {
    return Projects.find();
  }
});
