function insertUser(username,name,showPublic) {
  var userId = Meteor.users.insert({    
    username: username,
    showPublic: showPublic,
    profile: { name: name }
  });
  return Meteor.users.findOne(userId);
}

if (Teams.find().count() === 0) {
  var users = {};

  var dcw303Id = Meteor.users.insert(
    { "_id" : "JrvzK876e5PBHKc2T",
      "firstName" : "Daniel",
      "lastName" : "Crowley-Wilson",
      "showPublic" : true, 
      "createdAt" : 1370869232768, 
      "emails" : [ { 
        "address" : "daniel.crowley.wilson@gmail.com", 
        "verified" : true 
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
      "firstName" : "James",
      "lastName" :  "Howlett",
      "showPublic" : true, 
      "createdAt" : 1371260015064, 
      "emails" : [ { 
        "address" : "wolverine@wolverine.com", 
        "verified" : true 
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
      "firstName" : "Laura",
      "lastName" : "Kinney", 
      "showPublic" : true, 
      "createdAt" : 1371260040178, 
      "emails" : [ { 
        "address" : "x23@x23.com", 
        "verified" : true 
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


  users['shinji'] = insertUser('shinji','Shinji Ikari', true);
  users['asuka'] = insertUser('asuka','Asuka Langley Soryu', true);
  users['rei'] = insertUser('rei','Rei Ayanami', false);

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
    teamId: weaponXId,
    updatedAt: new Date(),
    detail: "Cred meh cardigan +1 fingerstache, brunch Schlitz keytar disrupt keffiyeh. Voluptate cray sriracha pug flannel. Adipisicing commodo small batch farm-to-table, dolore Truffaut lo-fi quis sriracha culpa single-origin coffee VHS incididunt. Meh wayfarers aute, dreamcatcher in Pinterest Wes Anderson actually Terry Richardson elit semiotics magna ex roof party. Hashtag wolf beard, ad mumblecore Austin plaid pour-over pariatur master cleanse. Vice plaid Neutra, Schlitz VHS deep v Carles 90's proident disrupt. Terry Richardson Tonx aliquip duis, artisan assumenda excepteur Portland retro sriracha ethical pug."
  });

  var xtinctionAgendaId = Projects.insert({
    name: 'The X-tinction Agenda',
    code: 'xtinctionagenda',
    teamId: weaponXId,
    updatedAt: new Date(),
    detail: "Cred meh cardigan +1 fingerstache, brunch Schlitz keytar disrupt keffiyeh. Voluptate cray sriracha pug flannel. Adipisicing commodo small batch farm-to-table, dolore Truffaut lo-fi quis sriracha culpa single-origin coffee VHS incididunt. Meh wayfarers aute, dreamcatcher in Pinterest Wes Anderson actually Terry Richardson elit semiotics magna ex roof party. Hashtag wolf beard, ad mumblecore Austin plaid pour-over pariatur master cleanse. Vice plaid Neutra, Schlitz VHS deep v Carles 90's proident disrupt. Terry Richardson Tonx aliquip duis, artisan assumenda excepteur Portland retro sriracha ethical pug."
  });

  var daysFutureM1Id = Features.insert({
    ownedByUserId: 'JrvzK876e5PBHKc2T',
    createdByUserId: 'JrvzK876e5PBHKc2T',
    teamId: weaponXId,
    projectId: daysFutureId,
    code: 'featureOne',
    name: 'Feature One',
    updatedAt: new Date(),
    detail: "Cosby sweater beard YOLO pariatur disrupt pop-up, lomo eu mlkshk aesthetic Godard sint Neutra scenester. Artisan consectetur deep v twee. Small batch mustache aute, cornhole Williamsburg non Banksy YOLO gentrify single-origin coffee fashion axe mollit. Williamsburg sapiente semiotics, shoreditch small batch selfies forage next level fingerstache hella deserunt selvage et tousled exercitation. Wes Anderson semiotics butcher sint cupidatat, bicycle rights scenester Carles Neutra occupy asymmetrical labore. Vinyl Tonx quinoa, iPhone art party do Cosby sweater four loko aliqua cillum bitters organic authentic consequat. YOLO mustache chambray, fashion axe banh mi Odd Future ethical ea est you probably haven't heard of them nulla gluten-free."
  });

  var daysFutureM2Id = Features.insert({
    ownedByUserId: 'JrvzK876e5PBHKc2T',
    createdByUserId: 'JrvzK876e5PBHKc2T',
    teamId: weaponXId,
    projectId: daysFutureId,
    code: 'featureTwo',
    name: 'Feature Two',
    updatedAt: new Date(),
    detail: "Cosby sweater beard YOLO pariatur disrupt pop-up, lomo eu mlkshk aesthetic Godard sint Neutra scenester. Artisan consectetur deep v twee. Small batch mustache aute, cornhole Williamsburg non Banksy YOLO gentrify single-origin coffee fashion axe mollit. Williamsburg sapiente semiotics, shoreditch small batch selfies forage next level fingerstache hella deserunt selvage et tousled exercitation. Wes Anderson semiotics butcher sint cupidatat, bicycle rights scenester Carles Neutra occupy asymmetrical labore. Vinyl Tonx quinoa, iPhone art party do Cosby sweater four loko aliqua cillum bitters organic authentic consequat. YOLO mustache chambray, fashion axe banh mi Odd Future ethical ea est you probably haven't heard of them nulla gluten-free."
  });

  var daysFutureM3Id = Features.insert({
    ownedByUserId: 'JrvzK876e5PBHKc2T',
    createdByUserId: 'JrvzK876e5PBHKc2T',
    teamId: weaponXId,
    projectId: daysFutureId,
    code: 'featureThree',
    name: 'Feature Three',
    updatedAt: new Date(),
    detail: "Cosby sweater beard YOLO pariatur disrupt pop-up, lomo eu mlkshk aesthetic Godard sint Neutra scenester. Artisan consectetur deep v twee. Small batch mustache aute, cornhole Williamsburg non Banksy YOLO gentrify single-origin coffee fashion axe mollit. Williamsburg sapiente semiotics, shoreditch small batch selfies forage next level fingerstache hella deserunt selvage et tousled exercitation. Wes Anderson semiotics butcher sint cupidatat, bicycle rights scenester Carles Neutra occupy asymmetrical labore. Vinyl Tonx quinoa, iPhone art party do Cosby sweater four loko aliqua cillum bitters organic authentic consequat. YOLO mustache chambray, fashion axe banh mi Odd Future ethical ea est you probably haven't heard of them nulla gluten-free."
  });

  var xtinctionAgendaM1Id = Features.insert({
    ownedByUserId: 'JrvzK876e5PBHKc2T',
    createdByUserId: 'JrvzK876e5PBHKc2T',
    teamId: weaponXId,
    projectId: xtinctionAgendaId,
    code: 'featureFour',
    name: 'Feature Four',
    updatedAt: new Date(),
    detail: "Cosby sweater beard YOLO pariatur disrupt pop-up, lomo eu mlkshk aesthetic Godard sint Neutra scenester. Artisan consectetur deep v twee. Small batch mustache aute, cornhole Williamsburg non Banksy YOLO gentrify single-origin coffee fashion axe mollit. Williamsburg sapiente semiotics, shoreditch small batch selfies forage next level fingerstache hella deserunt selvage et tousled exercitation. Wes Anderson semiotics butcher sint cupidatat, bicycle rights scenester Carles Neutra occupy asymmetrical labore. Vinyl Tonx quinoa, iPhone art party do Cosby sweater four loko aliqua cillum bitters organic authentic consequat. YOLO mustache chambray, fashion axe banh mi Odd Future ethical ea est you probably haven't heard of them nulla gluten-free."
  });

  var xtinctionAgendaM2Id = Features.insert({
    ownedByUserId: 'JrvzK876e5PBHKc2T',
    createdByUserId: 'JrvzK876e5PBHKc2T',
    teamId: weaponXId,
    projectId: xtinctionAgendaId,
    code: 'featureFive',
    name: 'Feature Five',
    updatedAt: new Date(),
    detail: "Cosby sweater beard YOLO pariatur disrupt pop-up, lomo eu mlkshk aesthetic Godard sint Neutra scenester. Artisan consectetur deep v twee. Small batch mustache aute, cornhole Williamsburg non Banksy YOLO gentrify single-origin coffee fashion axe mollit. Williamsburg sapiente semiotics, shoreditch small batch selfies forage next level fingerstache hella deserunt selvage et tousled exercitation. Wes Anderson semiotics butcher sint cupidatat, bicycle rights scenester Carles Neutra occupy asymmetrical labore. Vinyl Tonx quinoa, iPhone art party do Cosby sweater four loko aliqua cillum bitters organic authentic consequat. YOLO mustache chambray, fashion axe banh mi Odd Future ethical ea est you probably haven't heard of them nulla gluten-free."
  });

  var xtinctionAgendaM3Id = Features.insert({
    ownedByUserId: 'JrvzK876e5PBHKc2T',
    createdByUserId: 'JrvzK876e5PBHKc2T',
    teamId: weaponXId,
    projectId: xtinctionAgendaId,
    code: 'featureSix',
    name: 'Feature Six',
    updatedAt: new Date(),
    detail: "Cosby sweater beard YOLO pariatur disrupt pop-up, lomo eu mlkshk aesthetic Godard sint Neutra scenester. Artisan consectetur deep v twee. Small batch mustache aute, cornhole Williamsburg non Banksy YOLO gentrify single-origin coffee fashion axe mollit. Williamsburg sapiente semiotics, shoreditch small batch selfies forage next level fingerstache hella deserunt selvage et tousled exercitation. Wes Anderson semiotics butcher sint cupidatat, bicycle rights scenester Carles Neutra occupy asymmetrical labore. Vinyl Tonx quinoa, iPhone art party do Cosby sweater four loko aliqua cillum bitters organic authentic consequat. YOLO mustache chambray, fashion axe banh mi Odd Future ethical ea est you probably haven't heard of them nulla gluten-free."
  });
  
  var issueOneId = Issues.insert({
    createdByUserId: 'JrvzK876e5PBHKc2T',
    ownedByUserId: 'JrvzK876e5PBHKc2T',
    teamId: weaponXId,
    projectId: daysFutureId,
    featureId: daysFutureM1Id,
    code: 'issueOne',
    name: 'Issue One',
    status: 0,
    statusChanged: new Date(),
    rank: 1,
    updatedAt: new Date(),
    detail: "Chillwave enim direct trade, blog consequat ethnic iPhone leggings 8-bit twee ad reprehenderit readymade. Gentrify seitan aute semiotics. Kogi deserunt pork belly four loko eu placeat, you probably haven't heard of them Echo Park freegan Bushwick Truffaut. Bicycle rights sapiente actually, vegan raw denim cliche polaroid magna pug Bushwick. Ugh tote bag next level, american apparel plaid butcher craft beer ethical excepteur shoreditch swag sunt beard dreamcatcher odio. Twee laboris gluten-free salvia church-key photo booth, Pinterest ex tofu laborum bicycle rights magna nihil stumptown. Cardigan adipisicing authentic, Echo Park culpa messenger bag plaid ex excepteur McSweeney's tofu minim ugh letterpress esse. Nostrud ullamco in, tousled organic try-hard pour-over laboris sapiente church-key. Whatever Bushwick adipisicing, keffiyeh tempor id Banksy fashion axe raw denim placeat High Life semiotics narwhal. Fingerstache semiotics odio pork belly excepteur try-hard, cardigan single-origin coffee. Forage duis actually, proident Schlitz locavore nihil Vice cliche. Aute Austin semiotics thundercats, single-origin coffee squid sriracha non sunt Wes Anderson Schlitz. Banh mi VHS +1 ullamco, fixie Vice sriracha Echo Park food truck. Carles yr chillwave, lo-fi mumblecore nostrud whatever kale chips try-hard banh mi sustainable vero american apparel. Viral chambray Wes Anderson selfies dolor. Tattooed nisi anim, mixtape reprehenderit consequat messenger bag narwhal single-origin coffee Carles fixie thundercats. Keytar narwhal post-ironic DIY next level readymade. Mumblecore placeat irony consequat. Brooklyn pug disrupt pitchfork, id vero culpa four loko kogi shoreditch chillwave DIY nisi. Meh semiotics fap hoodie forage sed officia. Cillum Bushwick typewriter kogi single-origin coffee try-hard. Et swag helvetica Williamsburg mlkshk, esse mumblecore direct trade aliquip DIY hashtag Vice sapiente. Bitters vero american apparel, whatever 3 wolf moon roof party flannel enim commodo. Consectetur tote bag chillwave forage. Tofu adipisicing pork belly, nesciunt disrupt bicycle rights sed tousled ethnic. Retro food truck velit pariatur, vinyl Wes Anderson literally YOLO nulla leggings aute four loko 3 wolf moon. Hella 3 wolf moon irony plaid, ethnic culpa Schlitz duis four loko gluten-free fap reprehenderit butcher. Selvage deep v tote bag tempor, Schlitz Pinterest pour-over brunch literally et."
  });

  var issueTwoId = Issues.insert({
    createdByUserId: 'JrvzK876e5PBHKc2T',
    ownedByUserId: 'JrvzK876e5PBHKc2T',
    teamId: weaponXId,
    projectId: daysFutureId,
    featureId: daysFutureM1Id,
    code: 'issueTwo',
    name: 'Issue Two',
    status: 0,
    statusChanged: new Date(),
    rank: 2,
    updatedAt: new Date(),
    detail: "Chillwave enim direct trade, blog consequat ethnic iPhone leggings 8-bit twee ad reprehenderit readymade. Gentrify seitan aute semiotics. Kogi deserunt pork belly four loko eu placeat, you probably haven't heard of them Echo Park freegan Bushwick Truffaut. Bicycle rights sapiente actually, vegan raw denim cliche polaroid magna pug Bushwick. Ugh tote bag next level, american apparel plaid butcher craft beer ethical excepteur shoreditch swag sunt beard dreamcatcher odio. Twee laboris gluten-free salvia church-key photo booth, Pinterest ex tofu laborum bicycle rights magna nihil stumptown. Cardigan adipisicing authentic, Echo Park culpa messenger bag plaid ex excepteur McSweeney's tofu minim ugh letterpress esse. Nostrud ullamco in, tousled organic try-hard pour-over laboris sapiente church-key. Whatever Bushwick adipisicing, keffiyeh tempor id Banksy fashion axe raw denim placeat High Life semiotics narwhal. Fingerstache semiotics odio pork belly excepteur try-hard, cardigan single-origin coffee. Forage duis actually, proident Schlitz locavore nihil Vice cliche. Aute Austin semiotics thundercats, single-origin coffee squid sriracha non sunt Wes Anderson Schlitz. Banh mi VHS +1 ullamco, fixie Vice sriracha Echo Park food truck. Carles yr chillwave, lo-fi mumblecore nostrud whatever kale chips try-hard banh mi sustainable vero american apparel. Viral chambray Wes Anderson selfies dolor. Tattooed nisi anim, mixtape reprehenderit consequat messenger bag narwhal single-origin coffee Carles fixie thundercats. Keytar narwhal post-ironic DIY next level readymade. Mumblecore placeat irony consequat. Brooklyn pug disrupt pitchfork, id vero culpa four loko kogi shoreditch chillwave DIY nisi. Meh semiotics fap hoodie forage sed officia. Cillum Bushwick typewriter kogi single-origin coffee try-hard. Et swag helvetica Williamsburg mlkshk, esse mumblecore direct trade aliquip DIY hashtag Vice sapiente. Bitters vero american apparel, whatever 3 wolf moon roof party flannel enim commodo. Consectetur tote bag chillwave forage. Tofu adipisicing pork belly, nesciunt disrupt bicycle rights sed tousled ethnic. Retro food truck velit pariatur, vinyl Wes Anderson literally YOLO nulla leggings aute four loko 3 wolf moon. Hella 3 wolf moon irony plaid, ethnic culpa Schlitz duis four loko gluten-free fap reprehenderit butcher. Selvage deep v tote bag tempor, Schlitz Pinterest pour-over brunch literally et."
  });
  
  var issueThreeId = Issues.insert({
    createdByUserId: 'JrvzK876e5PBHKc2T',
    ownedByUserId: 'JrvzK876e5PBHKc2T',
    teamId: weaponXId,
    projectId: daysFutureId,
    featureId: daysFutureM2Id,
    code: 'issueThree',
    name: 'Issue Three',
    status: 0,
    statusChanged: new Date(),
    rank: 3,
    updatedAt: new Date(),
    detail: "Chillwave enim direct trade, blog consequat ethnic iPhone leggings 8-bit twee ad reprehenderit readymade. Gentrify seitan aute semiotics. Kogi deserunt pork belly four loko eu placeat, you probably haven't heard of them Echo Park freegan Bushwick Truffaut. Bicycle rights sapiente actually, vegan raw denim cliche polaroid magna pug Bushwick. Ugh tote bag next level, american apparel plaid butcher craft beer ethical excepteur shoreditch swag sunt beard dreamcatcher odio. Twee laboris gluten-free salvia church-key photo booth, Pinterest ex tofu laborum bicycle rights magna nihil stumptown. Cardigan adipisicing authentic, Echo Park culpa messenger bag plaid ex excepteur McSweeney's tofu minim ugh letterpress esse. Nostrud ullamco in, tousled organic try-hard pour-over laboris sapiente church-key. Whatever Bushwick adipisicing, keffiyeh tempor id Banksy fashion axe raw denim placeat High Life semiotics narwhal. Fingerstache semiotics odio pork belly excepteur try-hard, cardigan single-origin coffee. Forage duis actually, proident Schlitz locavore nihil Vice cliche. Aute Austin semiotics thundercats, single-origin coffee squid sriracha non sunt Wes Anderson Schlitz. Banh mi VHS +1 ullamco, fixie Vice sriracha Echo Park food truck. Carles yr chillwave, lo-fi mumblecore nostrud whatever kale chips try-hard banh mi sustainable vero american apparel. Viral chambray Wes Anderson selfies dolor. Tattooed nisi anim, mixtape reprehenderit consequat messenger bag narwhal single-origin coffee Carles fixie thundercats. Keytar narwhal post-ironic DIY next level readymade. Mumblecore placeat irony consequat. Brooklyn pug disrupt pitchfork, id vero culpa four loko kogi shoreditch chillwave DIY nisi. Meh semiotics fap hoodie forage sed officia. Cillum Bushwick typewriter kogi single-origin coffee try-hard. Et swag helvetica Williamsburg mlkshk, esse mumblecore direct trade aliquip DIY hashtag Vice sapiente. Bitters vero american apparel, whatever 3 wolf moon roof party flannel enim commodo. Consectetur tote bag chillwave forage. Tofu adipisicing pork belly, nesciunt disrupt bicycle rights sed tousled ethnic. Retro food truck velit pariatur, vinyl Wes Anderson literally YOLO nulla leggings aute four loko 3 wolf moon. Hella 3 wolf moon irony plaid, ethnic culpa Schlitz duis four loko gluten-free fap reprehenderit butcher. Selvage deep v tote bag tempor, Schlitz Pinterest pour-over brunch literally et."
  });
  
  var issueFourId = Issues.insert({
    createdByUserId: 'JrvzK876e5PBHKc2T',
    ownedByUserId: 'JrvzK876e5PBHKc2T',
    teamId: weaponXId,
    projectId: daysFutureId,
    featureId: daysFutureM2Id,
    code: 'issueFour',
    name: 'Issue Four',
    status: 0,
    statusChanged: new Date(),
    rank: 4,
    updatedAt: new Date(),
    detail: "Chillwave enim direct trade, blog consequat ethnic iPhone leggings 8-bit twee ad reprehenderit readymade. Gentrify seitan aute semiotics. Kogi deserunt pork belly four loko eu placeat, you probably haven't heard of them Echo Park freegan Bushwick Truffaut. Bicycle rights sapiente actually, vegan raw denim cliche polaroid magna pug Bushwick. Ugh tote bag next level, american apparel plaid butcher craft beer ethical excepteur shoreditch swag sunt beard dreamcatcher odio. Twee laboris gluten-free salvia church-key photo booth, Pinterest ex tofu laborum bicycle rights magna nihil stumptown. Cardigan adipisicing authentic, Echo Park culpa messenger bag plaid ex excepteur McSweeney's tofu minim ugh letterpress esse. Nostrud ullamco in, tousled organic try-hard pour-over laboris sapiente church-key. Whatever Bushwick adipisicing, keffiyeh tempor id Banksy fashion axe raw denim placeat High Life semiotics narwhal. Fingerstache semiotics odio pork belly excepteur try-hard, cardigan single-origin coffee. Forage duis actually, proident Schlitz locavore nihil Vice cliche. Aute Austin semiotics thundercats, single-origin coffee squid sriracha non sunt Wes Anderson Schlitz. Banh mi VHS +1 ullamco, fixie Vice sriracha Echo Park food truck. Carles yr chillwave, lo-fi mumblecore nostrud whatever kale chips try-hard banh mi sustainable vero american apparel. Viral chambray Wes Anderson selfies dolor. Tattooed nisi anim, mixtape reprehenderit consequat messenger bag narwhal single-origin coffee Carles fixie thundercats. Keytar narwhal post-ironic DIY next level readymade. Mumblecore placeat irony consequat. Brooklyn pug disrupt pitchfork, id vero culpa four loko kogi shoreditch chillwave DIY nisi. Meh semiotics fap hoodie forage sed officia. Cillum Bushwick typewriter kogi single-origin coffee try-hard. Et swag helvetica Williamsburg mlkshk, esse mumblecore direct trade aliquip DIY hashtag Vice sapiente. Bitters vero american apparel, whatever 3 wolf moon roof party flannel enim commodo. Consectetur tote bag chillwave forage. Tofu adipisicing pork belly, nesciunt disrupt bicycle rights sed tousled ethnic. Retro food truck velit pariatur, vinyl Wes Anderson literally YOLO nulla leggings aute four loko 3 wolf moon. Hella 3 wolf moon irony plaid, ethnic culpa Schlitz duis four loko gluten-free fap reprehenderit butcher. Selvage deep v tote bag tempor, Schlitz Pinterest pour-over brunch literally et."
  });

  var issueFiveId = Issues.insert({
    createdByUserId: 'JrvzK876e5PBHKc2T',
    ownedByUserId: 'JrvzK876e5PBHKc2T',
    teamId: weaponXId,
    projectId: daysFutureId,
    featureId: daysFutureM3Id,
    code: 'issueFive',
    name: 'Issue Five',
    status: 0,
    statusChanged: new Date(),
    rank: 5,
    updatedAt: new Date(),
    detail: "Chillwave enim direct trade, blog consequat ethnic iPhone leggings 8-bit twee ad reprehenderit readymade. Gentrify seitan aute semiotics. Kogi deserunt pork belly four loko eu placeat, you probably haven't heard of them Echo Park freegan Bushwick Truffaut. Bicycle rights sapiente actually, vegan raw denim cliche polaroid magna pug Bushwick. Ugh tote bag next level, american apparel plaid butcher craft beer ethical excepteur shoreditch swag sunt beard dreamcatcher odio. Twee laboris gluten-free salvia church-key photo booth, Pinterest ex tofu laborum bicycle rights magna nihil stumptown. Cardigan adipisicing authentic, Echo Park culpa messenger bag plaid ex excepteur McSweeney's tofu minim ugh letterpress esse. Nostrud ullamco in, tousled organic try-hard pour-over laboris sapiente church-key. Whatever Bushwick adipisicing, keffiyeh tempor id Banksy fashion axe raw denim placeat High Life semiotics narwhal. Fingerstache semiotics odio pork belly excepteur try-hard, cardigan single-origin coffee. Forage duis actually, proident Schlitz locavore nihil Vice cliche. Aute Austin semiotics thundercats, single-origin coffee squid sriracha non sunt Wes Anderson Schlitz. Banh mi VHS +1 ullamco, fixie Vice sriracha Echo Park food truck. Carles yr chillwave, lo-fi mumblecore nostrud whatever kale chips try-hard banh mi sustainable vero american apparel. Viral chambray Wes Anderson selfies dolor. Tattooed nisi anim, mixtape reprehenderit consequat messenger bag narwhal single-origin coffee Carles fixie thundercats. Keytar narwhal post-ironic DIY next level readymade. Mumblecore placeat irony consequat. Brooklyn pug disrupt pitchfork, id vero culpa four loko kogi shoreditch chillwave DIY nisi. Meh semiotics fap hoodie forage sed officia. Cillum Bushwick typewriter kogi single-origin coffee try-hard. Et swag helvetica Williamsburg mlkshk, esse mumblecore direct trade aliquip DIY hashtag Vice sapiente. Bitters vero american apparel, whatever 3 wolf moon roof party flannel enim commodo. Consectetur tote bag chillwave forage. Tofu adipisicing pork belly, nesciunt disrupt bicycle rights sed tousled ethnic. Retro food truck velit pariatur, vinyl Wes Anderson literally YOLO nulla leggings aute four loko 3 wolf moon. Hella 3 wolf moon irony plaid, ethnic culpa Schlitz duis four loko gluten-free fap reprehenderit butcher. Selvage deep v tote bag tempor, Schlitz Pinterest pour-over brunch literally et."
  });
  
  var issueSixId = Issues.insert({
    createdByUserId: 'JrvzK876e5PBHKc2T',
    ownedByUserId: 'JrvzK876e5PBHKc2T',
    teamId: weaponXId,
    projectId: daysFutureId,
    featureId: daysFutureM3Id,
    code: 'issueSix',
    name: 'Issue Six',
    status: 0,
    statusChanged: new Date(),
    rank: 6,
    updatedAt: new Date(),
    detail: "Chillwave enim direct trade, blog consequat ethnic iPhone leggings 8-bit twee ad reprehenderit readymade. Gentrify seitan aute semiotics. Kogi deserunt pork belly four loko eu placeat, you probably haven't heard of them Echo Park freegan Bushwick Truffaut. Bicycle rights sapiente actually, vegan raw denim cliche polaroid magna pug Bushwick. Ugh tote bag next level, american apparel plaid butcher craft beer ethical excepteur shoreditch swag sunt beard dreamcatcher odio. Twee laboris gluten-free salvia church-key photo booth, Pinterest ex tofu laborum bicycle rights magna nihil stumptown. Cardigan adipisicing authentic, Echo Park culpa messenger bag plaid ex excepteur McSweeney's tofu minim ugh letterpress esse. Nostrud ullamco in, tousled organic try-hard pour-over laboris sapiente church-key. Whatever Bushwick adipisicing, keffiyeh tempor id Banksy fashion axe raw denim placeat High Life semiotics narwhal. Fingerstache semiotics odio pork belly excepteur try-hard, cardigan single-origin coffee. Forage duis actually, proident Schlitz locavore nihil Vice cliche. Aute Austin semiotics thundercats, single-origin coffee squid sriracha non sunt Wes Anderson Schlitz. Banh mi VHS +1 ullamco, fixie Vice sriracha Echo Park food truck. Carles yr chillwave, lo-fi mumblecore nostrud whatever kale chips try-hard banh mi sustainable vero american apparel. Viral chambray Wes Anderson selfies dolor. Tattooed nisi anim, mixtape reprehenderit consequat messenger bag narwhal single-origin coffee Carles fixie thundercats. Keytar narwhal post-ironic DIY next level readymade. Mumblecore placeat irony consequat. Brooklyn pug disrupt pitchfork, id vero culpa four loko kogi shoreditch chillwave DIY nisi. Meh semiotics fap hoodie forage sed officia. Cillum Bushwick typewriter kogi single-origin coffee try-hard. Et swag helvetica Williamsburg mlkshk, esse mumblecore direct trade aliquip DIY hashtag Vice sapiente. Bitters vero american apparel, whatever 3 wolf moon roof party flannel enim commodo. Consectetur tote bag chillwave forage. Tofu adipisicing pork belly, nesciunt disrupt bicycle rights sed tousled ethnic. Retro food truck velit pariatur, vinyl Wes Anderson literally YOLO nulla leggings aute four loko 3 wolf moon. Hella 3 wolf moon irony plaid, ethnic culpa Schlitz duis four loko gluten-free fap reprehenderit butcher. Selvage deep v tote bag tempor, Schlitz Pinterest pour-over brunch literally et."
  });
  
  var issueSevenId = Issues.insert({
    createdByUserId: 'JrvzK876e5PBHKc2T',
    ownedByUserId: 'JrvzK876e5PBHKc2T',
    teamId: weaponXId,
    projectId: xtinctionAgendaId,
    featureId: xtinctionAgendaM1Id,
    code: 'issueSeven',
    name: 'Issue Seven',
    status: 0,
    statusChanged: new Date(),
    rank: 1,
    updatedAt: new Date(),
    detail: "Chillwave enim direct trade, blog consequat ethnic iPhone leggings 8-bit twee ad reprehenderit readymade. Gentrify seitan aute semiotics. Kogi deserunt pork belly four loko eu placeat, you probably haven't heard of them Echo Park freegan Bushwick Truffaut. Bicycle rights sapiente actually, vegan raw denim cliche polaroid magna pug Bushwick. Ugh tote bag next level, american apparel plaid butcher craft beer ethical excepteur shoreditch swag sunt beard dreamcatcher odio. Twee laboris gluten-free salvia church-key photo booth, Pinterest ex tofu laborum bicycle rights magna nihil stumptown. Cardigan adipisicing authentic, Echo Park culpa messenger bag plaid ex excepteur McSweeney's tofu minim ugh letterpress esse. Nostrud ullamco in, tousled organic try-hard pour-over laboris sapiente church-key. Whatever Bushwick adipisicing, keffiyeh tempor id Banksy fashion axe raw denim placeat High Life semiotics narwhal. Fingerstache semiotics odio pork belly excepteur try-hard, cardigan single-origin coffee. Forage duis actually, proident Schlitz locavore nihil Vice cliche. Aute Austin semiotics thundercats, single-origin coffee squid sriracha non sunt Wes Anderson Schlitz. Banh mi VHS +1 ullamco, fixie Vice sriracha Echo Park food truck. Carles yr chillwave, lo-fi mumblecore nostrud whatever kale chips try-hard banh mi sustainable vero american apparel. Viral chambray Wes Anderson selfies dolor. Tattooed nisi anim, mixtape reprehenderit consequat messenger bag narwhal single-origin coffee Carles fixie thundercats. Keytar narwhal post-ironic DIY next level readymade. Mumblecore placeat irony consequat. Brooklyn pug disrupt pitchfork, id vero culpa four loko kogi shoreditch chillwave DIY nisi. Meh semiotics fap hoodie forage sed officia. Cillum Bushwick typewriter kogi single-origin coffee try-hard. Et swag helvetica Williamsburg mlkshk, esse mumblecore direct trade aliquip DIY hashtag Vice sapiente. Bitters vero american apparel, whatever 3 wolf moon roof party flannel enim commodo. Consectetur tote bag chillwave forage. Tofu adipisicing pork belly, nesciunt disrupt bicycle rights sed tousled ethnic. Retro food truck velit pariatur, vinyl Wes Anderson literally YOLO nulla leggings aute four loko 3 wolf moon. Hella 3 wolf moon irony plaid, ethnic culpa Schlitz duis four loko gluten-free fap reprehenderit butcher. Selvage deep v tote bag tempor, Schlitz Pinterest pour-over brunch literally et."
  });

  var issueEightId = Issues.insert({
    createdByUserId: 'JrvzK876e5PBHKc2T',
    ownedByUserId: 'JrvzK876e5PBHKc2T',
    teamId: weaponXId,
    projectId: xtinctionAgendaId,
    featureId: xtinctionAgendaM1Id,
    code: 'issueEight',
    name: 'Issue Eight',
    status: 0,
    statusChanged: new Date(),
    rank: 2,
    updatedAt: new Date(),
    detail: "Chillwave enim direct trade, blog consequat ethnic iPhone leggings 8-bit twee ad reprehenderit readymade. Gentrify seitan aute semiotics. Kogi deserunt pork belly four loko eu placeat, you probably haven't heard of them Echo Park freegan Bushwick Truffaut. Bicycle rights sapiente actually, vegan raw denim cliche polaroid magna pug Bushwick. Ugh tote bag next level, american apparel plaid butcher craft beer ethical excepteur shoreditch swag sunt beard dreamcatcher odio. Twee laboris gluten-free salvia church-key photo booth, Pinterest ex tofu laborum bicycle rights magna nihil stumptown. Cardigan adipisicing authentic, Echo Park culpa messenger bag plaid ex excepteur McSweeney's tofu minim ugh letterpress esse. Nostrud ullamco in, tousled organic try-hard pour-over laboris sapiente church-key. Whatever Bushwick adipisicing, keffiyeh tempor id Banksy fashion axe raw denim placeat High Life semiotics narwhal. Fingerstache semiotics odio pork belly excepteur try-hard, cardigan single-origin coffee. Forage duis actually, proident Schlitz locavore nihil Vice cliche. Aute Austin semiotics thundercats, single-origin coffee squid sriracha non sunt Wes Anderson Schlitz. Banh mi VHS +1 ullamco, fixie Vice sriracha Echo Park food truck. Carles yr chillwave, lo-fi mumblecore nostrud whatever kale chips try-hard banh mi sustainable vero american apparel. Viral chambray Wes Anderson selfies dolor. Tattooed nisi anim, mixtape reprehenderit consequat messenger bag narwhal single-origin coffee Carles fixie thundercats. Keytar narwhal post-ironic DIY next level readymade. Mumblecore placeat irony consequat. Brooklyn pug disrupt pitchfork, id vero culpa four loko kogi shoreditch chillwave DIY nisi. Meh semiotics fap hoodie forage sed officia. Cillum Bushwick typewriter kogi single-origin coffee try-hard. Et swag helvetica Williamsburg mlkshk, esse mumblecore direct trade aliquip DIY hashtag Vice sapiente. Bitters vero american apparel, whatever 3 wolf moon roof party flannel enim commodo. Consectetur tote bag chillwave forage. Tofu adipisicing pork belly, nesciunt disrupt bicycle rights sed tousled ethnic. Retro food truck velit pariatur, vinyl Wes Anderson literally YOLO nulla leggings aute four loko 3 wolf moon. Hella 3 wolf moon irony plaid, ethnic culpa Schlitz duis four loko gluten-free fap reprehenderit butcher. Selvage deep v tote bag tempor, Schlitz Pinterest pour-over brunch literally et."
  });
  
  var issueNineId = Issues.insert({
    createdByUserId: 'JrvzK876e5PBHKc2T',
    ownedByUserId: 'JrvzK876e5PBHKc2T',
    teamId: weaponXId,
    projectId: xtinctionAgendaId,
    featureId: xtinctionAgendaM2Id,
    code: 'issueNine',
    name: 'Issue Nine',
    status: 0,
    statusChanged: new Date(),
    rank: 3,
    updatedAt: new Date(),
    detail: "Chillwave enim direct trade, blog consequat ethnic iPhone leggings 8-bit twee ad reprehenderit readymade. Gentrify seitan aute semiotics. Kogi deserunt pork belly four loko eu placeat, you probably haven't heard of them Echo Park freegan Bushwick Truffaut. Bicycle rights sapiente actually, vegan raw denim cliche polaroid magna pug Bushwick. Ugh tote bag next level, american apparel plaid butcher craft beer ethical excepteur shoreditch swag sunt beard dreamcatcher odio. Twee laboris gluten-free salvia church-key photo booth, Pinterest ex tofu laborum bicycle rights magna nihil stumptown. Cardigan adipisicing authentic, Echo Park culpa messenger bag plaid ex excepteur McSweeney's tofu minim ugh letterpress esse. Nostrud ullamco in, tousled organic try-hard pour-over laboris sapiente church-key. Whatever Bushwick adipisicing, keffiyeh tempor id Banksy fashion axe raw denim placeat High Life semiotics narwhal. Fingerstache semiotics odio pork belly excepteur try-hard, cardigan single-origin coffee. Forage duis actually, proident Schlitz locavore nihil Vice cliche. Aute Austin semiotics thundercats, single-origin coffee squid sriracha non sunt Wes Anderson Schlitz. Banh mi VHS +1 ullamco, fixie Vice sriracha Echo Park food truck. Carles yr chillwave, lo-fi mumblecore nostrud whatever kale chips try-hard banh mi sustainable vero american apparel. Viral chambray Wes Anderson selfies dolor. Tattooed nisi anim, mixtape reprehenderit consequat messenger bag narwhal single-origin coffee Carles fixie thundercats. Keytar narwhal post-ironic DIY next level readymade. Mumblecore placeat irony consequat. Brooklyn pug disrupt pitchfork, id vero culpa four loko kogi shoreditch chillwave DIY nisi. Meh semiotics fap hoodie forage sed officia. Cillum Bushwick typewriter kogi single-origin coffee try-hard. Et swag helvetica Williamsburg mlkshk, esse mumblecore direct trade aliquip DIY hashtag Vice sapiente. Bitters vero american apparel, whatever 3 wolf moon roof party flannel enim commodo. Consectetur tote bag chillwave forage. Tofu adipisicing pork belly, nesciunt disrupt bicycle rights sed tousled ethnic. Retro food truck velit pariatur, vinyl Wes Anderson literally YOLO nulla leggings aute four loko 3 wolf moon. Hella 3 wolf moon irony plaid, ethnic culpa Schlitz duis four loko gluten-free fap reprehenderit butcher. Selvage deep v tote bag tempor, Schlitz Pinterest pour-over brunch literally et."
  });
  
  var issueTenId = Issues.insert({
    createdByUserId: 'JrvzK876e5PBHKc2T',
    ownedByUserId: 'JrvzK876e5PBHKc2T',
    teamId: weaponXId,
    projectId: xtinctionAgendaId,
    featureId: xtinctionAgendaM2Id,
    code: 'issueTen',
    name: 'Issue Ten',
    status: 0,
    statusChanged: new Date(),
    rank: 4,
    updatedAt: new Date(),
    detail: "Chillwave enim direct trade, blog consequat ethnic iPhone leggings 8-bit twee ad reprehenderit readymade. Gentrify seitan aute semiotics. Kogi deserunt pork belly four loko eu placeat, you probably haven't heard of them Echo Park freegan Bushwick Truffaut. Bicycle rights sapiente actually, vegan raw denim cliche polaroid magna pug Bushwick. Ugh tote bag next level, american apparel plaid butcher craft beer ethical excepteur shoreditch swag sunt beard dreamcatcher odio. Twee laboris gluten-free salvia church-key photo booth, Pinterest ex tofu laborum bicycle rights magna nihil stumptown. Cardigan adipisicing authentic, Echo Park culpa messenger bag plaid ex excepteur McSweeney's tofu minim ugh letterpress esse. Nostrud ullamco in, tousled organic try-hard pour-over laboris sapiente church-key. Whatever Bushwick adipisicing, keffiyeh tempor id Banksy fashion axe raw denim placeat High Life semiotics narwhal. Fingerstache semiotics odio pork belly excepteur try-hard, cardigan single-origin coffee. Forage duis actually, proident Schlitz locavore nihil Vice cliche. Aute Austin semiotics thundercats, single-origin coffee squid sriracha non sunt Wes Anderson Schlitz. Banh mi VHS +1 ullamco, fixie Vice sriracha Echo Park food truck. Carles yr chillwave, lo-fi mumblecore nostrud whatever kale chips try-hard banh mi sustainable vero american apparel. Viral chambray Wes Anderson selfies dolor. Tattooed nisi anim, mixtape reprehenderit consequat messenger bag narwhal single-origin coffee Carles fixie thundercats. Keytar narwhal post-ironic DIY next level readymade. Mumblecore placeat irony consequat. Brooklyn pug disrupt pitchfork, id vero culpa four loko kogi shoreditch chillwave DIY nisi. Meh semiotics fap hoodie forage sed officia. Cillum Bushwick typewriter kogi single-origin coffee try-hard. Et swag helvetica Williamsburg mlkshk, esse mumblecore direct trade aliquip DIY hashtag Vice sapiente. Bitters vero american apparel, whatever 3 wolf moon roof party flannel enim commodo. Consectetur tote bag chillwave forage. Tofu adipisicing pork belly, nesciunt disrupt bicycle rights sed tousled ethnic. Retro food truck velit pariatur, vinyl Wes Anderson literally YOLO nulla leggings aute four loko 3 wolf moon. Hella 3 wolf moon irony plaid, ethnic culpa Schlitz duis four loko gluten-free fap reprehenderit butcher. Selvage deep v tote bag tempor, Schlitz Pinterest pour-over brunch literally et."
  });

  var issueElevenId = Issues.insert({
    createdByUserId: 'JrvzK876e5PBHKc2T',
    ownedByUserId: 'JrvzK876e5PBHKc2T',
    teamId: weaponXId,
    projectId: xtinctionAgendaId,
    featureId: xtinctionAgendaM3Id,
    code: 'issueEleven',
    name: 'Issue Eleven',
    status: 0,
    statusChanged: new Date(),
    rank: 5,
    updatedAt: new Date(),
    detail: "Chillwave enim direct trade, blog consequat ethnic iPhone leggings 8-bit twee ad reprehenderit readymade. Gentrify seitan aute semiotics. Kogi deserunt pork belly four loko eu placeat, you probably haven't heard of them Echo Park freegan Bushwick Truffaut. Bicycle rights sapiente actually, vegan raw denim cliche polaroid magna pug Bushwick. Ugh tote bag next level, american apparel plaid butcher craft beer ethical excepteur shoreditch swag sunt beard dreamcatcher odio. Twee laboris gluten-free salvia church-key photo booth, Pinterest ex tofu laborum bicycle rights magna nihil stumptown. Cardigan adipisicing authentic, Echo Park culpa messenger bag plaid ex excepteur McSweeney's tofu minim ugh letterpress esse. Nostrud ullamco in, tousled organic try-hard pour-over laboris sapiente church-key. Whatever Bushwick adipisicing, keffiyeh tempor id Banksy fashion axe raw denim placeat High Life semiotics narwhal. Fingerstache semiotics odio pork belly excepteur try-hard, cardigan single-origin coffee. Forage duis actually, proident Schlitz locavore nihil Vice cliche. Aute Austin semiotics thundercats, single-origin coffee squid sriracha non sunt Wes Anderson Schlitz. Banh mi VHS +1 ullamco, fixie Vice sriracha Echo Park food truck. Carles yr chillwave, lo-fi mumblecore nostrud whatever kale chips try-hard banh mi sustainable vero american apparel. Viral chambray Wes Anderson selfies dolor. Tattooed nisi anim, mixtape reprehenderit consequat messenger bag narwhal single-origin coffee Carles fixie thundercats. Keytar narwhal post-ironic DIY next level readymade. Mumblecore placeat irony consequat. Brooklyn pug disrupt pitchfork, id vero culpa four loko kogi shoreditch chillwave DIY nisi. Meh semiotics fap hoodie forage sed officia. Cillum Bushwick typewriter kogi single-origin coffee try-hard. Et swag helvetica Williamsburg mlkshk, esse mumblecore direct trade aliquip DIY hashtag Vice sapiente. Bitters vero american apparel, whatever 3 wolf moon roof party flannel enim commodo. Consectetur tote bag chillwave forage. Tofu adipisicing pork belly, nesciunt disrupt bicycle rights sed tousled ethnic. Retro food truck velit pariatur, vinyl Wes Anderson literally YOLO nulla leggings aute four loko 3 wolf moon. Hella 3 wolf moon irony plaid, ethnic culpa Schlitz duis four loko gluten-free fap reprehenderit butcher. Selvage deep v tote bag tempor, Schlitz Pinterest pour-over brunch literally et."
  });
  
  var issueTwelveId = Issues.insert({
    createdByUserId: 'JrvzK876e5PBHKc2T',
    ownedByUserId: 'JrvzK876e5PBHKc2T',
    teamId: weaponXId,
    projectId: xtinctionAgendaId,
    featureId: xtinctionAgendaM3Id,
    code: 'issueTwelve',
    name: 'Issue Twelve',
    status: 0,
    statusChanged: new Date(),
    rank: 6,
    updatedAt: new Date(),
    detail: "Chillwave enim direct trade, blog consequat ethnic iPhone leggings 8-bit twee ad reprehenderit readymade. Gentrify seitan aute semiotics. Kogi deserunt pork belly four loko eu placeat, you probably haven't heard of them Echo Park freegan Bushwick Truffaut. Bicycle rights sapiente actually, vegan raw denim cliche polaroid magna pug Bushwick. Ugh tote bag next level, american apparel plaid butcher craft beer ethical excepteur shoreditch swag sunt beard dreamcatcher odio. Twee laboris gluten-free salvia church-key photo booth, Pinterest ex tofu laborum bicycle rights magna nihil stumptown. Cardigan adipisicing authentic, Echo Park culpa messenger bag plaid ex excepteur McSweeney's tofu minim ugh letterpress esse. Nostrud ullamco in, tousled organic try-hard pour-over laboris sapiente church-key. Whatever Bushwick adipisicing, keffiyeh tempor id Banksy fashion axe raw denim placeat High Life semiotics narwhal. Fingerstache semiotics odio pork belly excepteur try-hard, cardigan single-origin coffee. Forage duis actually, proident Schlitz locavore nihil Vice cliche. Aute Austin semiotics thundercats, single-origin coffee squid sriracha non sunt Wes Anderson Schlitz. Banh mi VHS +1 ullamco, fixie Vice sriracha Echo Park food truck. Carles yr chillwave, lo-fi mumblecore nostrud whatever kale chips try-hard banh mi sustainable vero american apparel. Viral chambray Wes Anderson selfies dolor. Tattooed nisi anim, mixtape reprehenderit consequat messenger bag narwhal single-origin coffee Carles fixie thundercats. Keytar narwhal post-ironic DIY next level readymade. Mumblecore placeat irony consequat. Brooklyn pug disrupt pitchfork, id vero culpa four loko kogi shoreditch chillwave DIY nisi. Meh semiotics fap hoodie forage sed officia. Cillum Bushwick typewriter kogi single-origin coffee try-hard. Et swag helvetica Williamsburg mlkshk, esse mumblecore direct trade aliquip DIY hashtag Vice sapiente. Bitters vero american apparel, whatever 3 wolf moon roof party flannel enim commodo. Consectetur tote bag chillwave forage. Tofu adipisicing pork belly, nesciunt disrupt bicycle rights sed tousled ethnic. Retro food truck velit pariatur, vinyl Wes Anderson literally YOLO nulla leggings aute four loko 3 wolf moon. Hella 3 wolf moon irony plaid, ethnic culpa Schlitz duis four loko gluten-free fap reprehenderit butcher. Selvage deep v tote bag tempor, Schlitz Pinterest pour-over brunch literally et."
  });
} 
