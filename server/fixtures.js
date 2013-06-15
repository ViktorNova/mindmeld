function insertUser(username,name) {
  var userId = Meteor.users.insert({
    username: username,
    profile: { name: name }
  });
  return Meteor.users.findOne(userId);
}

if (Teams.find().count() === 0) {
  var users = {};

  var dcw303Id = Meteor.users.insert(
    { "_id" : "JrvzK876e5PBHKc2T", 
      "createdAt" : 1370869232768, 
      "emails" : [ { 
        "address" : "daniel.crowley.wilson@gmail.com", 
        "verified" : false 
      } ], 
      "services" : { 
        "password" : { 
          "srp" : { 
            "identity" : "h7hFCieoKiLwNEvuK", 
            "salt" : "XRdwPrwLGRqMmzZEw", 
            "verifier" : "39faaf6158259d000bb11067e489f24c47013a91fca6010fe038ab5dfd1ceb105e6793f3aae41637fbc65a9edc96bbba72f75cd46e4962d488b707dcc1c20b6fc6aeeadfc2ef21220cb789037abaa7088f65b606f5b6bd25810fd5ccdc5398bfd87812f0cd846dab47c48ab0a7061dce8ab2de782b20d07dba853fba2e472b65" 
          } 
        }, 
      }, 
      "username" : "dcw303" 
    });

  var wolverineId = Meteor.users.insert(
    { "_id" : "jNt9ErmtN4HvxsnKn", 
      "createdAt" : 1371260015064, 
      "emails" : [ { 
        "address" : "wolverine@wolverine.com", 
        "verified" : false 
      } ], 
      "services" : { 
        "password" : { 
          "srp" : { 
            "identity" : "ZsGjeNnqhQWAg5iAm", 
            "salt" : "6dyqNy9L7BY4Rq5cN", 
            "verifier" : "a96cc3922a9bfa4419334912093945b15c2cd4e96a27bfdcb9617093664e4cc82a77d572e9ea70017d16587f362f24c965ab9acdbd5f48f6f68f19f96ab1358323a12d541dba2a0cd2f7da105f2c5dd427ed235f534cf01f4cf1e91debb2fd58bb8e5c5429e52eac58c32edfc4b4a4f50de8a7a1ed0c73a1070bc93bfeca228d" 
          } 
        }, 
      }, 
      "username" : "wolverine" 
    });

  var x23Id = Meteor.users.insert(
    { "_id" : "ozEMYtxk6kZp4oAPa", 
      "createdAt" : 1371260040178, 
      "emails" : [ { 
        "address" : "x23@x23.com", 
        "verified" : false 
      } ], 
      "services" : { 
        "password" : { 
          "srp" : { 
            "identity" : "8sDCPYbFkrgwbFko4", 
            "salt" : "3gdqzm2DnNjSaaknE", 
            "verifier" : "310c363ad8fcff9c778bffba36f29e68e18d3f53714b5418445d15a85953469f024b59abe244fba36c905d6ed9723f9fdff22672a6638b4fbd112ccd1bdb617e3f629d97e4e796dcee997d635dc6f3fb591ef50fd9400a5753bb2412c8ce5eaaf66af0ece9e50aabd547c2fa9fb06a203816ee06962ffd05ef1c44df8d5d62dc" 
          } 
        }, 
      }, 
      "username" : "x23" 
    });


  users['shinji'] = insertUser('shinji','Shinji Ikari');
  users['asuka'] = insertUser('asuka','Asuka Langley Soryu');
  users['rei'] = insertUser('rei','Rei Ayanami');

  var weaponXId = Teams.insert({
    name: 'Weapon X',
    code: 'weaponx',
    owner: dcw303Id,
    members: [  dcw303Id, wolverineId, x23Id ]
  });
  
  var evaId = Teams.insert({
    name: 'Eva',
    code: 'eva',
    owner: users['shinji']._id,
    members: [ users['shinji']._id, users['asuka']._id, users['rei']._id]
  });

  var daysFutureId = Projects.insert({
    name: 'Days of Future Past',
    code: 'daysfuture',
    teamId: weaponXId
  });

  var xtinctionAgendaId = Projects.insert({
    name: 'The X-tinction Agenda',
    code: 'xtinctionagenda',
    teamId: weaponXId
  });

  var daysFutureM1Id = Milestones.insert({
    teamId: weaponXId,
    projectId: daysFutureId,
    index: 1
  });

  var daysFutureM2Id = Milestones.insert({
    teamId: weaponXId,
    projectId: daysFutureId,
    index: 2
  });

  var daysFutureM3Id = Milestones.insert({
    teamId: weaponXId,
    projectId: daysFutureId,
    index: 3
  });

  var xtinctionAgendaM1Id = Milestones.insert({
    teamId: weaponXId,
    projectId: xtinctionAgendaId,
    index: 1
  });

  var xtinctionAgendaM2Id = Milestones.insert({
    teamId: weaponXId,
    projectId: xtinctionAgendaId,
    index: 2
  });

  var xtinctionAgendaM3Id = Milestones.insert({
    teamId: weaponXId,
    projectId: xtinctionAgendaId,
    index: 3
  });
  
  Issues.insert({
    teamId: weaponXId,
    projectId: daysFutureId,
    milestoneId: daysFutureM1Id,
    code: 'issueOne',
    title: 'Issue One'
  });

  Issues.insert({
    teamId: weaponXId,
    projectId: daysFutureId,
    milestoneId: daysFutureM1Id,
    code: 'issueTwo',
    title: 'Issue Two'
  });
  
  Issues.insert({
    teamId: weaponXId,
    projectId: daysFutureId,
    milestoneId: daysFutureM2Id,
    code: 'issueThree',
    title: 'Issue Three'
  });
  
  Issues.insert({
    teamId: weaponXId,
    projectId: daysFutureId,
    milestoneId: daysFutureM2Id,
    code: 'issueFour',
    title: 'Issue Four'
  });

  Issues.insert({
    teamId: weaponXId,
    projectId: daysFutureId,
    milestoneId: daysFutureM3Id,
    code: 'issueFive',
    title: 'Issue Five'
  });
  
  Issues.insert({
    teamId: weaponXId,
    projectId: daysFutureId,
    milestoneId: daysFutureM3Id,
    code: 'issueSix',
    title: 'Issue Six'
  });
  
  Issues.insert({
    teamId: weaponXId,
    projectId: xtinctionAgendaId,
    milestoneId: xtinctionAgendaM1Id,
    code: 'issueSeven',
    title: 'Issue Seven'
  });

  Issues.insert({
    teamId: weaponXId,
    projectId: xtinctionAgendaId,
    milestoneId: xtinctionAgendaM1Id,
    code: 'issueEight',
    title: 'Issue Eight'
  });
  
  Issues.insert({
    teamId: weaponXId,
    projectId: xtinctionAgendaId,
    milestoneId: xtinctionAgendaM2Id,
    code: 'issueNine',
    title: 'Issue Nine'
  });
  
  Issues.insert({
    teamId: weaponXId,
    projectId: xtinctionAgendaId,
    milestoneId: xtinctionAgendaM2Id,
    code: 'issueTen',
    title: 'Issue Ten'
  });

  Issues.insert({
    teamId: weaponXId,
    projectId: xtinctionAgendaId,
    milestoneId: xtinctionAgendaM3Id,
    code: 'issueEleven',
    title: 'Issue Eleven'
  });
  
  Issues.insert({
    teamId: weaponXId,
    projectId: xtinctionAgendaId,
    milestoneId: xtinctionAgendaM3Id,
    code: 'issueTwelve',
    title: 'Issue Twelve'
  });
} 
