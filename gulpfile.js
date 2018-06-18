'use strict';

const path = require('path');
const gulp = require('gulp');
const babel = require('gulp-babel');
const gLess = require('gulp-less');
const env = require('dotenv').config().parsed;

const src = './src';
const dirDist = env.DIR_DIST;
const js = path.join(src, '**/*.+(js|jsx)');
const less = path.join(src, '**/*.less');

gulp.task('js', function() {
   return gulp.src(js)
      .pipe(babel({
         presets: ['es2015', 'stage-0', 'react']
      }))
      .pipe(gulp.dest(dirDist));
});

gulp.task('less', function() {
   return gulp.src(less)
      .pipe(gLess())
      .pipe(gulp.dest(dirDist));
});

gulp.task('build', ['js', 'less']);

gulp.task('watch', ['build'], function() {
   gulp.watch(js, ['js']);
   gulp.watch(less, ['less']);
});
