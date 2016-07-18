//Module with variables and methods for config build process
module.exports = function () {

  //Main config variables with final distribution names (you can change them)
  var appScriptsFile = 'app.js';
  var appStylesFile = 'app.css';
  var appTemplatesFile = 'templates.js';
  var appLanguagesFile = 'languages.js';
  var vendorScriptsFile = 'vendor.js';
  var vendorStylesFile = 'vendor.css';
  var distributionAppFolder = 'dist';
  var distributionAssetsFolder = 'dist/assets';
  var mainModule = 'app';
  var templatesFolder = 'templates';

  //Main class config for app and vendor assets from a dev process (you cannot change them)
  var AppConfig = function () {

    var directFiles = ['public/**/*', 'app/index.html'];

    var appAssets = {
      scripts: ['app/app.js', 'app/modules/**/*.js', 'app/**/*.js', '!app/locales/**/*.js'],
      styles: 'app/styles/**/*.css',
      sassStyles: 'app/styles/**/*.scss',
      lessStyles: 'app/styles/**/*.less',
      templates: 'app/templates/**/*.html',
      languages: 'app/locales/**/*.js'
    };

    var vendorAssets = {
      scripts: [],
      styles: []
    };

    this.importScript = function (file) {

      vendorAssets.scripts.push(file);
    };

    this.importStyle = function (file) {

      vendorAssets.styles.push(file);
    };

    this.getDirectFiles = function () {
      return directFiles;
    };

    this.getAssets = function () {
      return {
        app: appAssets,
        vendor: vendorAssets
      }
    }
  };

  //The main point where you can start importing new vendor / bower / node dependencies for JS and CSS.
  var app = new AppConfig();

  app.importScript('bower_components/angular/angular.min.js');
  app.importScript('bower_components/angular-ui-router/release/angular-ui-router.min.js');
  app.importScript('bower_components/angular-restmod/dist/angular-restmod-bundle.min.js');
  app.importScript('bower_components/satellizer/satellizer.min.js');
  app.importScript('bower_components/angular-translate/angular-translate.min.js');
  app.importScript('bower_components/angular-cookies/angular-cookies.min.js');
  app.importScript('bower_components/angular-translate-storage-cookie/angular-translate-storage-cookie.min.js');
  app.importScript('bower_components/angular-translate-storage-local/angular-translate-storage-local.min.js');

  //Returning module object
  return {
    assets: app.getAssets(),
    directFiles: app.getDirectFiles(),
    appScriptsFile: appScriptsFile,
    appStylesFile: appStylesFile,
    appTemplatesFile: appTemplatesFile,
    appLanguagesFile: appLanguagesFile,
    vendorScriptsFile: vendorScriptsFile,
    vendorStylesFile: vendorStylesFile,
    distributionAppFolder: distributionAppFolder,
    distributionAssetsFolder: distributionAssetsFolder,
    mainModule: mainModule,
    templatesFolder: templatesFolder
  };
};

