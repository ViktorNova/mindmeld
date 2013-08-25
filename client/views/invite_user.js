Template.inviteUser.helpers(Meteor.userFunctions);
Template.inviteUserForm.helpers(_.extend(_.clone(Meteor.userFunctions), Meteor.formFunctions));
Template.tabHeaders.helpers(Meteor.userFunctions);
Template.teamInvitesWithUsernameTable.helpers(Meteor.userFunctions);
Template.teamInvitesWithEmailTable.helpers(Meteor.userFunctions);

Template.inviteUserForm.preserve('.tabbable');

var initialRemainingInviteCount;
var dataContext;

function pluralInvites(count) {
  return count == 1 ? "invite" : "invites";
}

function displayRemainingInviteCount(e) {
  $('#remainingInviteCount').text(remainingInviteCount() + " " + pluralInvites(remainingInviteCount()) + " remaining");
  remainingInviteByUsernameCount();
  remainingInviteByEmailCount();
}

function remainingInviteCount() {
  var remainingInviteCount = initialRemainingInviteCount;
  var currentMembers = dataContext.data.currentTeam.members.length;
  remainingInviteCount -= currentMembers;
  var currentOutstandingInvites = TeamInvites.find({teamId: dataContext.data.currentTeam._id}).fetch().length;
  remainingInviteCount -= currentOutstandingInvites;
  var currentInvitesByEmail = $('#inviteByEmail').select2('val').length;
  remainingInviteCount -= currentInvitesByEmail;
  var currentInvitesByUsername = $('#inviteByUsername').select2('val').length;
  remainingInviteCount -= currentInvitesByUsername;
  return remainingInviteCount;
}

function remainingInviteByUsernameCount() {
  var remainingInviteCount = initialRemainingInviteCount;
  var currentMembers = dataContext.data.currentTeam.members.length;
  remainingInviteCount -= currentMembers;
  var currentOutstandingInvites = TeamInvites.find({teamId: dataContext.data.currentTeam._id}).fetch().length;
  remainingInviteCount -= currentOutstandingInvites;
  var currentInvitesByEmail = $('#inviteByEmail').select2('val').length;
  remainingInviteCount -= currentInvitesByEmail;

  $('#inviteByUsername').select2("readonly", remainingInviteCount <= 0);
  $('#inviteByEmail').select2("readonly", false);

  return remainingInviteCount;
}

function remainingInviteByEmailCount() {
  var remainingInviteCount = initialRemainingInviteCount;
  var currentMembers = dataContext.data.currentTeam.members.length;
  remainingInviteCount -= currentMembers;
  var currentOutstandingInvites = TeamInvites.find({teamId: dataContext.data.currentTeam._id}).fetch().length;
  remainingInviteCount -= currentOutstandingInvites;
  var currentInvitesByUsername = $('#inviteByUsername').select2('val').length;
  remainingInviteCount -= currentInvitesByUsername;

  $('#inviteByEmail').select2("readonly", remainingInviteCount <= 0);
  $('#inviteByUsername').select2("readonly", false);

  return remainingInviteCount;
}

Template.inviteUserForm.rendered = function() {

  dataContext = this;

  if (this.data.currentTeam)
    initialRemainingInviteCount = this.data.currentTeam.inviteCount || 10;
  else
    initialRemainingInviteCount = 0;

  $(document).ready(function() {

    $('#inviteByUsername')
      .on("change", displayRemainingInviteCount)
      .select2({
        minimumInputLength: 1,
        maximumSelectionSize: remainingInviteByUsernameCount,
        multiple: true,
        width: "100%",
        formatSelectionTooBig: function(maxSize) {
          return "You can enter a maximum of " + maxSize + " usernames";
        },
        query: function(query) {
          var data = {results: []};
          Meteor.call('getPublicUsernames', query.term, dataContext.data.currentTeam._id, function(error, result) {
            data.results = result;
            query.callback(data);
          });
        }
    });

    $('#inviteByEmail')
      .on("change", displayRemainingInviteCount)
      .select2({
        maximumSelectionSize: remainingInviteByEmailCount,
        multiple: true,
        width: "100%",
        formatSearching: function() {
          return "Enter an email address";
        },
        formatNoMatches: function(term) {
          return "Enter an email address";
        },
        formatSelectionTooBig: function(maxSize) {
          return "You can enter a maximum of " + maxSize + " email addresses"
        },
        query: function(query) {
          var data = {results: []};
          Meteor.call('validateEmailForSelect2', query.term, dataContext.data.currentTeam._id, function(error, result) {
            data.results = result;
            query.callback(data);
          });
        }
    });

    displayRemainingInviteCount();  

    $('#mytabs a[href="#tab-outstanding-invites-by-email"]').click(function (e) {
      e.preventDefault();
      $(this).tab('show');
    });

    $('#mytabs a[href="#tab-outstanding-invites-by-username"]').click(function (e) {
      e.preventDefault();
      $(this).tab('show');
    });

    if (Session.equals('lastInviteType','email'))
      $('#mytabs a[href="#tab-outstanding-invites-by-email"]').tab('show');
    else
      $('#mytabs a[href="#tab-outstanding-invites-by-username"]').tab('show');

  });
}

Template.inviteUserForm.events({
  'click #invite-users': function(event) {
    event.preventDefault();
    var usernameInviteCount = $('#inviteByUsername').select2('val').length;
    var emailInviteCount = $('#inviteByEmail').select2('val').length;
    if (usernameInviteCount + emailInviteCount == 0)
      return;
    var teamId = $('input#teamId').val();
    Meteor.call('addTeamInvites',$('#teamId').val(), $('#inviteByUsername').select2('val'), $('#inviteByEmail').select2('val'));

    $('#inviteByUsername').select2('val', '');
    $('#inviteByEmail').select2('val', '');
  },
  'click .revokeByEmail': function(event) {
    event.preventDefault();
    var email = event.target.dataset.email;
    if (email)
      Meteor.call('revokeByEmail',$('#teamId').val(), email);
    Session.set('lastInviteType','email');
  },
  'click .revokeByUsername': function(event) {
    event.preventDefault();
    var username = event.target.dataset.username;
    if (username)
      Meteor.call('revokeByUsername',$('#teamId').val(), username);
    Session.set('lastInviteType','username');
  }
});
