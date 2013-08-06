Template.inviteUser.helpers(Meteor.userFunctions);
Template.inviteUserForm.helpers(_.extend(_.clone(Meteor.userFunctions), Meteor.formFunctions));

var initialRemainingInviteCount = 7;

function displayRemainingInviteCount(e) {
  $('#remainingInviteCount').text('Remaining invite count: ' + remainingInviteCount());
  remainingInviteByUsernameCount();
  remainingInviteByEmailCount();
}

function remainingInviteCount() {
  var remainingInviteCount = initialRemainingInviteCount;
  var currentMembers = Teams.findOne(Session.get('currentTeamId')).members.length;
  remainingInviteCount -= currentMembers;
  var currentOutstandingInvites = TeamInvites.find({teamId: Session.get('currentTeamId')}).fetch().length;
  remainingInviteCount -= currentOutstandingInvites;
  var currentInvitesByEmail = $('#inviteByEmail').select2('val').length;
  remainingInviteCount -= currentInvitesByEmail;
  var currentInvitesByUsername = $('#inviteByUsername').select2('val').length;
  remainingInviteCount -= currentInvitesByUsername;
  return remainingInviteCount;
}

function remainingInviteByUsernameCount() {
  var remainingInviteCount = initialRemainingInviteCount;
  var currentMembers = Teams.findOne(Session.get('currentTeamId')).members.length;
  remainingInviteCount -= currentMembers;
  var currentOutstandingInvites = TeamInvites.find({teamId: Session.get('currentTeamId')}).fetch().length;
  remainingInviteCount -= currentOutstandingInvites;
  var currentInvitesByEmail = $('#inviteByEmail').select2('val').length;
  remainingInviteCount -= currentInvitesByEmail;

  $('#inviteByUsername').select2("readonly", remainingInviteCount <= 0);
  $('#inviteByEmail').select2("readonly", false);

  return remainingInviteCount;
}

function remainingInviteByEmailCount() {
  var remainingInviteCount = initialRemainingInviteCount;
  var currentMembers = Teams.findOne(Session.get('currentTeamId')).members.length;
  remainingInviteCount -= currentMembers;
  var currentOutstandingInvites = TeamInvites.find({teamId: Session.get('currentTeamId')}).fetch().length;
  remainingInviteCount -= currentOutstandingInvites;
  var currentInvitesByUsername = $('#inviteByUsername').select2('val').length;
  remainingInviteCount -= currentInvitesByUsername;

  $('#inviteByEmail').select2("readonly", remainingInviteCount <= 0);
  $('#inviteByUsername').select2("readonly", false);

  return remainingInviteCount;
}


Template.inviteUserForm.rendered = function() {
  $(document).ready(function() {

    $('#inviteByUsername')
      .on("change", displayRemainingInviteCount)
      .select2({
        minimumInputLength: 3,
        maximumSelectionSize: remainingInviteByUsernameCount,
        multiple: true,
        width: "100%",
        formatSelectionTooBig: function(maxSize) {
          return "You can enter a maximum of " + maxSize + " usernames";
        },
        query: function(query) {
          var data = {results: []};
          Meteor.call('getPublicUsernames', query.term, function(error, result) {
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
          Meteor.call('validateEmailForSelect2', query.term, function(error, result) {
            data.results = result;
            query.callback(data);
          });
        }
    });

    displayRemainingInviteCount();  
  });
}