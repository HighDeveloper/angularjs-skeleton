# AngularJS Skeleton

This README outlines the details of collaborating on this AngularJS 1.x application (like an Ember).
A short introduction of this app could easily go here.

## Default AngularJS modules

* Routing using [ui-router](https://github.com/angular-ui/ui-router)
* Models like ORM using [angular-restmod](https://github.com/platanus/angular-restmod)
* Authentication (token-based) using [satellizer](https://github.com/sahat/satellizer)
* Translation (i18n) using [angular-translate](https://github.com/angular-translate/angular-translate)

## Default rules, architecture and development support

* Default main module is `app` and namespace sub-modules with this, like `app.authentication` module or `app.users` this referencing to module of users
* Main entry point is `index.html` of `app` directory. There, all styles, scripts and dependencies are injected
* Default routing added to main module `app`  named `router.js` where you can define routes with templates, controllers and more
* Default translation added to main module `app` named `i18n.js` where you can define language translations and get all file messages from `locales` directory
* Inside `styles` directory you can work with raw css, less or sass if you prefer. Then you have selected how work, delete unused files
* Added example of controller named `app.authentication.signin`. This name is related to `module.controller_name` without the `controller` suffix because it is added to `controllers` directory
* Added example of model using angular-restmod, named `app.user`. The model is user but this is added to global and main module called `app`
* When you add new dependency manually (downloading file) or using bower, put them into `vendor` directory and then add import style / script inside config-build.js (remember execute `gulp build`)
* When you add favicon, images and fonts, put them into `public` folder and then reference them inside `index.html` of `app` directory
* All test cases using karma for unit testing, and e2e testing using protractor need to be added inside `tests/unit` and `tests/e2e` directories respectively (remember framework used is jasmine)
* You can re-define the name of main module inside `app.js` and also the naming conventions, project structure, dependencies and more. However we recommend these rules for better approach

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`
* `bower install`

## Running, full-build and serve development server with live reload (AIO command)

* `gulp`
* Visit your app at [http://localhost:3000](http://localhost:3000) the port can be changed 3000 is browser-sync default port.

## Running only development server with live reload

* `gulp server`
* Visit your app at [http://localhost:3000](http://localhost:3000).

## Building

* `gulp build`
* Check-out the dist folder with the last files and changes. This execute full-build with styles, scripts, templates and more.
* Always use this command when you add new script / style into config-build.js.

## Testing

* `gulp unit-tests` execute all unit testing files inside `tests/unit` directory
* `gulp e2e-tests` execute all e2e testing files inside `tests/e2e` directory
