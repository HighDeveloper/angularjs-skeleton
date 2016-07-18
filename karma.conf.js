'use strict';
// Karma configuration
module.exports = function(config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',
    // frameworks to use
    frameworks: ['jasmine'],
    // list of files / patterns to load in the browser
    files: [
      'dist/assets/**/*.js',
      'tests/unit/**/*.js'
    ],
    // enable / disable colors in the output (reporters and logs)
    colors: true,
    // level of logging, possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,
    // start these browsers
    browsers: ['Chrome'],
    // execute tests and exists
    singleRun: true
  });
};
