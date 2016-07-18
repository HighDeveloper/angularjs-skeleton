//Getting all dependencies to run all tasks

//Runners and compilers
var gulp = require('gulp');
var concat = require('gulp-concat');
var templateCache = require('gulp-angular-templatecache');
var inject = require('gulp-inject');
var sass = require('gulp-sass');
var less = require('gulp-less');
var merge = require('merge-stream');

//Build and server config
var browserSync = require('browser-sync').create();
var historyMiddleware = require('connect-history-api-fallback')({});
var config = require('./config-build')();

//Config variables to may build all
var appScript = config.distributionAssetsFolder + '/' + config.appScriptsFile;
var appStyle = config.distributionAssetsFolder + '/' + config.appStylesFile;
var appTemplateScript = config.distributionAssetsFolder + '/' + config.appTemplatesFile;
var appLanguageScript = config.distributionAssetsFolder + '/' + config.appLanguagesFile;
var vendorScript = config.distributionAssetsFolder + '/' + config.vendorScriptsFile;
var vendorStyle = config.distributionAssetsFolder + '/' + config.vendorStylesFile;

//Variables to handle unit and end to end testing
var Server = require('karma').Server;
var protractor = require("gulp-protractor").protractor;


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

  var sassStream = gulp.src(config.assets.app.sassStyles).pipe(sass());
  var lessStream = gulp.src(config.assets.app.lessStyles).pipe(less());
  var cssStream = gulp.src(config.assets.app.styles);

  return merge(sassStream, lessStream, cssStream).pipe(concat(config.appStylesFile)).pipe(gulp.dest(config.distributionAssetsFolder));
});

//Compile, concat and copy App Template files to distribution folder
gulp.task('app-templates', function () {

  return gulp.src(config.assets.app.templates).pipe(templateCache(config.appTemplatesFile, {
    root: config.templatesFolder,
    module: config.mainModule
  })).pipe(gulp.dest(config.distributionAssetsFolder));
});

//Compile, concat and copy App Languages files to distribution folder
gulp.task('app-languages', function () {

  return gulp.src(config.assets.app.languages).pipe(concat(config.appLanguagesFile)).pipe(gulp.dest(config.distributionAssetsFolder));
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
gulp.task('build', ['direct-files', 'app-scripts', 'app-styles', 'app-templates', 'app-languages', 'vendor-scripts', 'vendor-styles'], function () {

  return gulp.src('dist/index.html').pipe(inject(gulp.src([vendorScript, appScript, appTemplateScript, appLanguageScript, vendorStyle, appStyle], {read: false}), {relative: true})).pipe(gulp.dest('dist'));
});

//Task to run a Dev Server
gulp.task('serve', function () {

  browserSync.init({
    server: {
      baseDir: 'dist'
    },
    middleware: [historyMiddleware]
  });

  //Watch for apply live reload inside a Dev Server
  gulp.watch("dist/**/*").on('change', browserSync.reload);
  //Watch for to detect dev changes and then rebuild all dependencies calling the tasks properly
  gulp.watch(config.directFiles, ['direct-files'], function () {
    gulp.src('dist/index.html').pipe(inject(gulp.src([vendorScript, appScript, appTemplateScript, appLanguageScript, vendorStyle, appStyle], {read: false}), {relative: true})).pipe(gulp.dest('dist'));
  });
  gulp.watch(config.assets.app.scripts, ['app-scripts']);
  gulp.watch([config.assets.app.sassStyles, config.assets.app.lessStyles, config.assets.app.styles], ['app-styles']);
  gulp.watch(config.assets.app.templates, ['app-templates']);
  gulp.watch(config.assets.app.languages, ['app-languages']);
});

//Gulp default task
gulp.task('default', ['build', 'serve']);


//ALL TASK TO EXECUTE UNIT / End2End Tests

//Unit testing using karma
gulp.task('unit-tests', function (done) {

  new Server({
    configFile: 'karma.conf.js',
    singleRun: true
  }, done).start();
});

//E2E testing using protractor
gulp.task('e2e-tests', function () {

  gulp.src(['tests/e2e/**/*.js']).pipe(protractor({
      configFile: "protractor.conf.js",
      args: ['--baseUrl', 'http://127.0.0.1:8000']
    })
  ).on('error', function (e) {
      throw e
    });
});
