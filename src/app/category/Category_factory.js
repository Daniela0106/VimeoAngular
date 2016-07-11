(function(){
  'use strict';

  angular
    .module('vimeoAngular')
    .factory('CategoryFactory', CategoryFactory);

  /** @ngInject */
  function CategoryFactory($http, vimeoConfig){
    return {
      getCategories: function () {
        return $http({
          method: 'GET',
          url: 'https://api.vimeo.com/categories',
          headers: {Authorization: 'Bearer '+ vimeoConfig.ACCESS_TOKEN}
        }).then(function sucessCallback(responseCategories){
          return responseCategories;
        });
      }
    }
  }
})();
