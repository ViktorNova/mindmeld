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
        "resume" : { 
          "loginTokens" : [ 	{ 	
            "token" : "AdxoEc93JyL4Nvcs3", 	
            "when" : 1370869232769 
          }, 	{ 	
            "token" : "j2PTRdxj6dWQZHnJ6", 	
            "when" : 1370946613391 
          } ] 
        } 
      }, 
      "username" : "dcw303" 
    });

  users['wolverine'] = insertUser('wolverine','Logan');
  users['x23'] = insertUser('x23','Laura Kinney');
  users['shinji'] = insertUser('shinji','Shinji Ikari');
  users['asuka'] = insertUser('asuka','Asuka Langley Soryu');
  users['rei'] = insertUser('rei','Rei Ayanami');

  var weaponXId = Teams.insert({
    name: 'Weapon X',
    code: 'weaponx',
    owner: dcw303Id,
    members: [  dcw303Id, users['wolverine']._id, users['x23']._id ]
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
    code: 'daysFuture-1',
    name: 'Issue One'
  });

  Issues.insert({
    teamId: weaponXId,
    projectId: daysFutureId,
    milestoneId: daysFutureM1Id,
    code: 'daysFuture-2',
    name: 'Issue Two'
  });
  
  Issues.insert({
    teamId: weaponXId,
    projectId: daysFutureId,
    milestoneId: daysFutureM2Id,
    code: 'daysFuture-3',
    name: 'Issue Three'
  });
  
  Issues.insert({
    teamId: weaponXId,
    projectId: daysFutureId,
    milestoneId: daysFutureM2Id,
    code: 'daysFuture-4',
    name: 'Issue Four'
  });

  Issues.insert({
    teamId: weaponXId,
    projectId: daysFutureId,
    milestoneId: daysFutureM3Id,
    code: 'daysFuture-5',
    name: 'Issue Five'
  });
  
  Issues.insert({
    teamId: weaponXId,
    projectId: daysFutureId,
    milestoneId: daysFutureM3Id,
    code: 'daysFuture-6',
    name: 'Issue Six'
  });
  
  Issues.insert({
    teamId: weaponXId,
    projectId: xtinctionAgendaId,
    milestoneId: xtinctionAgendaM1Id,
    code: 'xtinctionAgenda-7',
    name: 'Issue Seven'
  });

  Issues.insert({
    teamId: weaponXId,
    projectId: xtinctionAgendaId,
    milestoneId: xtinctionAgendaM1Id,
    code: 'xtinctionAgenda-8',
    name: 'Issue Eight'
  });
  
  Issues.insert({
    teamId: weaponXId,
    projectId: xtinctionAgendaId,
    milestoneId: xtinctionAgendaM2Id,
    code: 'xtinctionAgenda-9',
    name: 'Issue Nine'
  });
  
  Issues.insert({
    teamId: weaponXId,
    projectId: xtinctionAgendaId,
    milestoneId: xtinctionAgendaM2Id,
    code: 'xtinctionAgenda-10',
    name: 'Issue Ten'
  });

  Issues.insert({
    teamId: weaponXId,
    projectId: xtinctionAgendaId,
    milestoneId: xtinctionAgendaM3Id,
    code: 'xtinctionAgenda-11',
    name: 'Issue Eleven'
  });
  
  Issues.insert({
    teamId: weaponXId,
    projectId: xtinctionAgendaId,
    milestoneId: xtinctionAgendaM3Id,
    code: 'xtinctionAgenda-12',
    name: 'Issue Twelve'
  });
} 
