var gulp = require('gulp')
, minifycss = require('gulp-minify-css')
, concat = require('gulp-concat')
, rename = require('gulp-rename')
, uglify = require('gulp-uglify')

gulp.task('default', function() {
  gulp.start('process-scripts', 'process-styles')
})

// app wide main css lib
gulp.task('process-styles', function() {
  return gulp.src([
    'bower_components/bootstrap/dist/css/bootstrap.css'
  ])
    .pipe(concat('vendor.css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('public/vendor/'))
})

// app wide main javascript lib
gulp.task('process-scripts', function() {
  // process js files
  return gulp.src([ 'bower_components/jquery/dist/jquery.js'
                  , 'bower_components/bootstrap/dist/js/bootstrap.js'
                  ])
    .pipe(concat('vendor.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('public/vendor/'))
})
