Just another YouTube Downloader
===============================

Basically this is just a playground / proof-of-concept to play with
the streaming [node-ytdl-core](https://github.com/fent/node-ytdl-core)
npm module.

This application allows you to download the YouTube media-file in the
highest available quality from YouTube and use it offline.

Setup
-----

Just do a `npm install` and call `gulp` or, if you like make, just
call `make`.


Deploy
------

1. Copy all the files to the production server. Exclude `node_modules`
and `bower_components`.

2. Install the required node-modules for production with `npm install --production`.

3. On the production server, use forever to start
the application, e.g. using `NODE_ENV=production npm start`.
