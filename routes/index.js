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
      var video = ytdl(url)
      video.on('info', function(info, format) {
        res.attachment(info.title+'.'+format.container)
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
