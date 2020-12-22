[![<ORG_NAME>](https://circleci.com/gh/adamjakab/PPM-Cloudflare-Worker.svg?style=shield)](https://circleci.com/gh/adamjakab/PPM-Cloudflare-Worker)
[![Coverage Status](https://coveralls.io/repos/github/adamjakab/PPM-Cloudflare-Worker/badge.svg?branch=master)](https://coveralls.io/github/adamjakab/PPM-Cloudflare-Worker?branch=master)


Cloudflare PPM Worker
========================
Secure distributed serverless storage for PPM project. 

How to Use
----------
You need your own Cloudflare account with paid bundled KV storage.
You will need to set up two KV namespaces (one for the configuration and another for the actual data storage).
You will then create a new worker and add the worker javascript code (`worker.js`) which you can find [under the latest release of this repository](/releases).
You can also set this worker up to be available under your specific domain name.
Once the worker is in place you can install the PPM client for your browser or for your mobile device and start using it.

Documentation
-------------
[Read the docs here](https://adamjakab.github.io/PPM-Cloudflare-Worker/)

How to contribute
-----------------
(Add guidelines here) - in the meanwhile use the [Discussions](/discussions) feature.


Notes
-----
Roadmap:
- authentication
- First release
- encrypted channel
- CI


Consider adding these:
- "url-parse": "^1.4.7",
- "on-change": "^2.2.0",


Circular Reference Check:
`node_modules/madge/bin/cli.js --circular --webpack-config ./webpack.config.dev.js --ts-config tsconfig.json ./src/index.ts`
`node_modules/madge/bin/cli.js --circular --ts-config tsconfig.json --exclude "index\.ts" ./src/index.ts`
