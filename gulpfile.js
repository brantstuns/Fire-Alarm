require('babel-polyfill');

const gulp = require('gulp');
const jasmineBrowser = require('gulp-jasmine-browser');
const webpack = require('webpack-stream');
const webpackTestConfig = require('./spec/webpack.test.config');
const webpackConfig = require('./webpack.config');
const plumber = require('gulp-plumber');
const gutil = require('gulp-util');
const nodemon = require('gulp-nodemon');

gulp.task('server', function () {
  nodemon({
    script: './server/server.js',
    ext: '.js',
    ignore: ['client/', 'public/']
  });
});

gulp.task('webpack', function () {
  return gulp.src('./client/index.js')
    .pipe(plumber())
    .pipe(webpack(Object.assign(webpackConfig, {watch: true})))
    .pipe(gulp.dest('public/'));
});

gulp.task('runIt', [
  'webpack',
  'server'
]);

gulp.task('jasmine', function () {
  process.env.NODE_ENV = 'test';
  return bundleUnitTestAssets({watch: true}, false)
    .pipe(jasmineBrowser.specRunner({sourcemappedStacktrace: true}))
    .pipe(jasmineBrowser.server({port: 8888}));
});

gulp.task('unitSpecs', function () {
  process.env.NODE_ENV = 'test';
  return bundleUnitTestAssets({}, true)
    .pipe(jasmineBrowser.specRunner({console: true}))
    .pipe(jasmineBrowser.headless());
});

function bundleUnitTestAssets (options, shouldKillProcess) {
  options = options || {};
  return gulp.src(['./spec/support/specHelper.js', './spec/**/*Spec.js'])
    .pipe(plumber())
    .pipe(webpack(Object.assign(webpackTestConfig, options)))
    .on('error', function (err) {
      gutil.log(gutil.colors.red('Building test assets failed'), gutil.colors.red(err));
      if (shouldKillProcess) {
        process.exit(1);
      }
    });
}

function bundleAssets(config, options) {
  options = options || {};
  return gulp.src('./client/index.js')
    .pipe(plumber())
    .pipe(webpack(Object.assign(config, options)));
}