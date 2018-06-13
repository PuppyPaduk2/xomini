'use strict';

const gulp = require('gulp');
const babel = require('gulp-babel');
const env = require('dotenv').config().parsed;

const dirServer = './src';
const js = [dirServer, '**/*.+(js|jsx)'].join('/');
const dirDist = env.DIR_DIST;
const confBabel = {
   presets: ['es2015', 'stage-0', 'react']
};

gulp.task('convert', function() {
   return gulp.src(js)
      .pipe(babel(confBabel))
      .pipe(gulp.dest(dirDist));
});

gulp.task('convert-watch', ['convert'], function() {
   gulp.watch(js, ['convert']);
});
