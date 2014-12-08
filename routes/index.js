var express = require('express')
var router = express.Router()
var querystring = require('querystring')
var ytdl = require('ytdl-core')

router.get('/', function(req, res, next) {
  res.locals.url = req.query.url
  res.locals.qs = querystring
  if (req.query.url) {
    var url = req.query.url
    if (req.query.download) {
      var filter = null

      switch(req.query.download) {
        case 'aac': // only aac audio
        filter = function(format) {
          return (!format.encoding && format.audioEncoding === 'aac')
        }
      }

      var video = ytdl(url, { filter: filter } )
      video.on('info', function(info, format) {
        // if it's not a video (encoding === null) so we know that it has to be an aac audio => m4a ext
        res.attachment(info.title+'.' + (format.encoding ? format.container : 'm4a'))
        res.type(format.type)
        res.setHeader('Content-Length', format.size)
      })
      video.pipe(res)
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
