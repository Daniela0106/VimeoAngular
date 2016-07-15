(function(){
  'use strict';

  angular
    .module('vimeoAngular')
    .factory('VideoFactory', VideoFactory);

  /** @ngInject */
  function VideoFactory($http, vimeoConfig){
    return {
      getVideos: function(){
        return $http({
          method: 'GET',
          //https://api.vimeo.com/categories?page=1&per_page=12
          url: vimeoConfig.API_HOST + 'categories/' + 'sports' + '/videos?per_page=12',
          headers: {Authorization: 'Bearer ' + vimeoConfig.ACCESS_TOKEN}
        }).then(function successCallback(responseVideos) {
          return responseVideos;
        });
      }
    }
  }




})();
