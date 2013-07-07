#!/bin/sh
# forked from http://www.meteorpedia.com/read/Nodejitsu
# original credit to Gadi Cohen
# GPL license
   
rm -rf ~/tmp/demeteorizer/
demeteorizer -o ~/tmp/demeteorizer
cd ~/tmp/demeteorizer
npm install
npm shrinkwrap
 
# confirmed to work with output of demeteorizer 0.2.1
#tail -r package.json | tail -n 2 | tail -r  > package2.json
#cat >> package2.json << __END__
#  },
#  "subdomain": "mindmeld",
#  "domains": [
#    "mindmeld.io",
#    "www.mindmeld.io"
#  ],
#  "scripts": {
#    "start": "node server/server.js"
#  }
#}
#__END__
#mv package2.json package.json
 
# Actual deploy to Nodejitsu
#jitsu deploy
