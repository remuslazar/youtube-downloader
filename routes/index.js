var express = require('express')
var router = express.Router()
var querystring = require('querystring')
var ytdl = require('ytdl-core')
var ffmpeg = require('fluent-ffmpeg')

router.get('/', function(req, res, next) {
  res.locals.url = req.query.url
  res.locals.qs = querystring
  if (req.query.url) {
    var url = req.query.url

    if (req.query.download) {

      var filter = null
      if(req.query.itag) {
        // in case that we want only the audio, we need the aac stream
        filter = function(format) {
          return (format.itag === req.query.itag)
        }
      }

      var stream = ytdl(url, { filter: filter } )
      stream.on('info', function(info, format) {
        // if it's not a video (encoding === null) so we know that it has to be an aac audio => m4a ext
        res.attachment(info.title+'.' + (format.encoding ? format.container :
                                         req.query.download === 'aac' ? 'm4a' : 'mp3'))
        res.type(req.query.format === 'mp3' ? 'audio/mpeg3' : format.type)

        if (req.query.download === 'video')
          res.setHeader('Content-Length', format.size)
        // else we will convert the stream on the fly and therefor
        // the output filesize is not availably in advance
      })

      if (req.query.download === 'audio') {
        // convert the aac stream on the fly using ffmpeg
        var proc = ffmpeg(stream)
            .audioCodec('libmp3lame')
            .format('mp3')
            .audioQuality(req.query.quality)
            .output(res)
            .on('error', function(err) {
              console.log('Cannot process stream with ffmpeg: ' + err.message);
              //res.end()
            })
            .run()
      } else // directly output the raw stream
        stream.pipe(res)
    } else {
      ytdl.getInfo(url, {}, function(err, info) {
        if (err) return next(err)
        return res.render('index', { info: info })
      })
    }
  } else {
    res.render('index')
  }
})

module.exports = router
