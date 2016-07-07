(function() { //Is an encapsulated anonymous function, a "self-invoking expression"
  'use strict';

  angular
    .module('vimeoAngular')
    .run(runBlock);

  /** @ngInject */
  function vimeoConfig(){
    var urlVideos = "https://api.vimeo.com/categories/art/videos?per_page=12";
    var urlCategories = "https://api.vimeo.com/categories";
    var ACCESS_TOKEN = "effa86d0284056eacb391c194926a789";
  }

  /** @ngInject */
  function runBlock($http) {
    $http.defaults.headers.common.Authorization = 'Bearer ' + vimeoConfig.ACCESS_TOKEN;
  }}());
