//Getting all dependencies to run all tasks
var gulp = require('gulp');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var templateCache = require('gulp-angular-templatecache');
var inject = require('gulp-inject');
var history = require('connect-history-api-fallback');
var config = require('./config-build')();
var historyMiddleware = history({});


//ALL TASK TO COMPILE, CONCAT AND COPY APP FILES TO DIST

//Copy App main files directly (without compile or concat) to distribution folder
gulp.task('direct-files', function () {

  return gulp.src(config.directFiles).pipe(gulp.dest(config.distributionAppFolder));
});

//Concat and copy App JS files to distribution folder
gulp.task('app-scripts', function () {

  return gulp.src(config.assets.app.scripts).pipe(concat(config.appScriptsFile)).pipe(gulp.dest(config.distributionAssetsFolder));
});

//Concat and copy App CSS files to distribution folder
gulp.task('app-styles', function () {

  return gulp.src(config.assets.app.styles).pipe(concat(config.appStylesFile)).pipe(gulp.dest(config.distributionAssetsFolder));
});

//Compile, concat and copy App Template files to distribution folder
gulp.task('app-templates', function () {

  return gulp.src(config.assets.app.templates).pipe(templateCache(config.appTemplatesFile, {
    root: config.templatesFolder,
    module: config.mainModule
  })).pipe(gulp.dest(config.distributionAssetsFolder));
});


//ALL TASK TO COMPILE, CONCAT AND COPY VENDOR / THIRD PARTY FILES TO DIST

//Concat and copy Vendor / Third party libs JS files to distribution folder
gulp.task('vendor-scripts', function () {

  return gulp.src(config.assets.vendor.scripts).pipe(concat(config.vendorScriptsFile)).pipe(gulp.dest(config.distributionAssetsFolder));
});

//Concat and copy Vendor / Third party libs CSS files to distribution folder
gulp.task('vendor-styles', function () {

  return gulp.src(config.assets.vendor.styles).pipe(concat(config.vendorStylesFile)).pipe(gulp.dest(config.distributionAssetsFolder));
});


//MAIN TASKS TO RUN ALWAYS WITH ANOTHER TASKS AS DEPENDENCIES

//Task to build, copy and inject all files inside a dist folder
gulp.task('build-inject', ['direct-files', 'app-scripts', 'app-styles', 'app-templates', 'vendor-scripts', 'vendor-styles'], function () {

  var appScript = config.distributionAssetsFolder + '/' + config.appScriptsFile;
  var appStyle = config.distributionAssetsFolder + '/' + config.appStylesFile;
  var appTemplateScript = config.distributionAssetsFolder + '/' + config.appTemplatesFile;
  var vendorScript = config.distributionAssetsFolder + '/' + config.vendorScriptsFile;
  var vendorStyle = config.distributionAssetsFolder + '/' + config.vendorStylesFile;

  return gulp.src('dist/index.html').pipe(inject(gulp.src([vendorScript, appScript, appTemplateScript, vendorStyle, appStyle], {read: false}), {relative: true})).pipe(gulp.dest('dist'));
});

//Task to run a Dev Server
gulp.task('server', function () {
  connect.server({
    port: 8000,
    root: 'dist',
    livereload: true,
    middleware: function(connect, opt) {
      return [historyMiddleware];
    }
  });
});

//Task to apply live reload inside a Dev Server
gulp.task('reload', function () {
  gulp.src('dist/**/*').pipe(connect.reload());
});

//Task to detect dev changes and then rebuild all dependencies calling the main task 'build-inject'
gulp.task('rebuild', function () {
  gulp.watch(['config-build.js', 'app/**/*'], ['build-inject', 'reload']);
});

//Gulp default task
gulp.task('default', ['build-inject', 'server', 'rebuild']);


