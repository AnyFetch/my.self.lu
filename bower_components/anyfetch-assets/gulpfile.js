"use strict";
/* jshint node: true */

var gulp = require('gulp');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var svgmin = require("gulp-svgmin");
var debug = require('gulp-debug');
var less = require('gulp-less');
var minifyCss = require('gulp-minify-css');

var paths = {
  less: {
    path: './stylesheets',
    entryPoint: './stylesheets/style.less'
  },
  js: {
    path: './scripts/',
  },
  img: {
    path: './images/',
  },
  dest: {
    path: './dist/',
  },
  moment: {
    path: './bower_components/moment/min/'
  }
};

gulp.task('less.normal', function() {
  return gulp.src(paths.less.entryPoint)
    .pipe(less())
    .pipe(rename({
      basename: 'index',
      extname: '.css'
    }))
    .pipe(gulp.dest(paths.dest.path));
});

gulp.task('less.min', function() {
  return gulp.src(paths.less.entryPoint)
    .pipe(less())
    .pipe(minifyCss())
    .pipe(rename({
      basename: 'index',
      extname: '.min.css'
    }))
    .pipe(gulp.dest(paths.dest.path));
});

gulp.task('less', ['less.normal', 'less.min']);

gulp.task('lint', function() {
  return gulp.src(paths.js.path + '*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('minifyJs', function minifyJs() {
  return gulp.src(paths.js.path + '*.js')
    .pipe(gulp.dest(paths.dest.path))
    .pipe(uglify())
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(gulp.dest(paths.dest.path));
});

gulp.task('concatJs', ['minifyJs'], function concatCss() {
  return gulp.src([paths.moment.path + 'moment-with-locales.min.js', paths.dest.path + 'index.min.js'])
    .pipe(concat('index-moment.min.js'))
    .pipe(gulp.dest(paths.dest.path));
});

gulp.task('svgImages', function svgImages() {
  return gulp.src(paths.img.path + '**/*.svg')
    .pipe(svgmin([
      {
        convertPathData: false
      },
    ]))
    .pipe(gulp.dest(paths.dest.path + "images/"));
});

gulp.task('pngImages', function pngImages() {
  return gulp.src(paths.img.path + '**/*.png')
    .pipe(gulp.dest(paths.dest.path + "images/"));
});

gulp.task('img', ['svgImages', 'pngImages']);
gulp.task('js', ['minifyJs', 'concatJs']);

gulp.task('watch', ['build'], function watch() {
  gulp.watch(paths.img.path + '*/**', ['img']);
  gulp.watch(paths.js.path + '*/**', ['js']);
  gulp.watch(paths.less.path + '*/**', ['less']);
});

gulp.task('default', ['build']);

gulp.task('build', ['less', 'lint', 'js', 'img']);
