'use strict';

var path = require('path');
var gulp = require('gulp');
var spawn = require('child_process').spawn;

var browserSync = require('browser-sync');

gulp.task('watch-mocks', function () {

  // start dyson
  var dyson = spawn('dyson', ['endpoint_mocks']);

  gulp.watch(['endpoint_mocks/**/*'], function(event){
    console.log('restart dyson...');
    // restart dyson
    dyson.kill();
    dyson = spawn('node_modules/.bin/dyson', ['endpoint_mocks']);

    browserSync.reload();

  });

});
