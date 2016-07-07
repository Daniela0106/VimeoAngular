(function(){
  'use strict';

  angular
    .module('vimeoAngular')
    .factory('VideoFactory', VideoFactory);

  /** @ngInject */
  function VideoFactory($http){
    return {
      getVideos: function(){
        return $http({
          method: 'GET',
          url: 'https://api.vimeo.com/categories/art/videos?per_page=12',
          headers: {Authorization: 'Bearer effa86d0284056eacb391c194926a789'}
        }).then(function successCallback(responseVideos) {
          return responseVideos;
        });
      }
    }
  }
})();
