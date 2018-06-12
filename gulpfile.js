'use strict';

const gulp = require('gulp');
const babel = require('gulp-babel');
const env = require('dotenv').config();

const dirServer = './src/server/**/*.js';
const dirDist = './dist';
const confBabel = {
   presets: ['env', 'react']
};

gulp.task('default', function() {
   console.log(env);

   return gulp.src(dirServer)
      .pipe(babel(confBabel))
      .pipe(gulp.dest(dirDist));
});
