'use strict';

var path = require('path'),
  gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  apidoc = require('gulp-apidoc');;

gulp.task('express', function () {
  nodemon({
    script: './index.js',
    ext: 'js'
  });
});

gulp.task('watch', function () {
  gulp.watch(['routes/**/*.js', 'routes/**/*.api'], ['apidoc']);  
});

gulp.task('apidoc', function (done) {
  apidoc({
    src: "routes/",
    dest: "public/api",
    debug: true,
    config: 'apidoc.json',
    includeFilters: [".*\\.js$", ".*\\.api$"]
  }, done);
});

gulp.task('default', ['apidoc', 'express', 'watch'])