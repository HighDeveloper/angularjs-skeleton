'use strict';

exports.config = {
  // frameworks to use (default)
  framework: 'jasmine',
  // connect directly to the browser without selenium
  directConnect: true,
  // Uue Chrome as browser for testing
  capabilities: {
    'browserName': 'chrome'
  },
  // e2e test files
  specs: ['tests/e2e/**/*.js'],
  // jasmine additional options
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  }
};
