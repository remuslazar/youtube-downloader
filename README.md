Just another YouTube Downloader
===============================

Basically this is just a playground / proof-of-concept to play with
the streaming [node-ytdl-core](https://github.com/fent/node-ytdl-core)
npm module.

This application allows you to download the video stream or the audio
only stream. The later can can be converted (transcoded) to various
formats and compression presets using ffmpeg.

This application will use a packaged ffmpeg version (`ffmpeg-bin` npm
module), which works for both Linux 64Bit and Darwin (MacOS) systems.

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

As mentioned above, the ffmpeg binary is included as an npm-module,
there is no need to install ffmpeg globally.
