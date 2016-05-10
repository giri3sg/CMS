/**
 * Created by Girish on 5/9/2016.
 */
'use strict';

/**
 * @ngdoc overview
 * @name cms
 * @description
 * # cms
 *
 * Main module of the application.
 */
angular
  .module('cms', [
    'ngRoute',
    'routes',
    'cms.controllers'
  ]).constant('config', {
  baseUrl : '/' , // Baseurl to load site resources
  carouselInterval:3000
});
