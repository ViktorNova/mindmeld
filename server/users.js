Accounts.emailTemplates.siteName = "mindmeld.io";
Accounts.emailTemplates.from = "Mindmeld <info@mindmeld.io>";
Accounts.emailTemplates.verifyEmail.subject = function() {
  return "Account Confirmation on mindmeld.io";
};
Accounts.emailTemplates.verifyEmail.text = function(user, url) {
  return  "Hi " + user.username + ",\n\n"
  +       "Your account is ready to use. Please confirm that this is your email address.\n\n"
  +       url.replace("/#/","/") + "\n\n"
  +       "If you didn't create a mindmeld.io account, you can ignore this email."
};

Meteor.methods({
  getPublicUsernames: function(usernameFragment, teamId) {

    var team = Teams.findOne({_id: teamId, members: {$in: [Meteor.userId()]}});
    if (!team)
      throw new Meteor.Error(403, "You are not authorized to get public usernames for this team");


    var usernames = Meteor.users.find({username: new RegExp(usernameFragment), showPublic: true},{username: 1}).fetch();
    var ret = _.map(usernames, function(item) { return {id: item.username, text: item.username}});
    var excludedUsernames = _.pluck(TeamInvites.find({teamId: teamId, username: {$exists: true}}).fetch(),'username');
    var teamUsernames = _.map(team.members, function(member) { return Meteor.users.findOne(member).username; });
    excludedUsernames = _.union(excludedUsernames, teamUsernames);

    var filter = _.filter(ret, function(user) { return !(_.contains(excludedUsernames, user.id)) });
    return filter;
  },
  validateEmailForSelect2: function(email, teamId) {

    var team = Teams.findOne({_id: teamId, members: {$in: [Meteor.userId()]}});
    if (!team)
      throw new Meteor.Error(403, "You are not authorized to get emails for this team");

    var existingEmail = TeamInvites.findOne({teamId: teamId, email: email});
    if (existingEmail)
      return [];

    if (email.match(/\S+@\S+\.\S+/))
      return [{id: email, text: email}];
    else
      return [];
  },
  sendVerificationEmail: function() {
    if (Meteor.userId()) {
      Accounts.sendVerificationEmail(Meteor.userId());
    } else {
      throw new Meteor.Error(403, "You must be signed in to send a verification email");
    }
  },
  signupUser: function(signupUserAttributes) {
    var signupUser = _.pick(signupUserAttributes,
      'username','password','firstName','lastName','email','showPublic','subscribe');

    if (!/^[a-z0-9]{3,30}$/.test(signupUser.username))
      throw new Meteor.Error(403, "Username must be 3-30 lowercase alphanumeric characters.");

    if (signupUser.password.length < 6 || signupUser.password.length > 32)
      throw new Meteor.Error(403, "Password must be 3-32 characters.");

    if (signupUser.firstName.length < 6 || signupUser.firstName.length > 32)
      throw new Meteor.Error(403, "First name must be 1-30 characters.");

    if (signupUser.lastName.length < 6 || signupUser.lastName.length > 32)
      throw new Meteor.Error(403, "Last name must be 1-30 characters.");

    if (signupUser.email.length > 256)
      throw new Meteor.Error(403, "Email must not be greater than 256 characters.");

    var userId = Accounts.createUser({
      username: signupUser.username, 
      email: signupUser.email, 
      password: signupUser.password,
      profile: {
        firstName: signupUser.firstName,
        lastName: signupUser.lastName,
        showPublic: signupUser.showPublic,
        subscribe: signupUser.subscribe
      }
    });

    Accounts.sendVerificationEmail(userId);
    return true;
  }
});