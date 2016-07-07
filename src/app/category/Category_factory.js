(function(){
  'use strict';

  angular
    .module('vimeoAngular')
    .factory('CategoryFactory', CategoryFactory);

  /** @ngInject */
  function CategoryFactory($http){
    return {
      getCategories: function () {
        return $http({
          method: 'GET',
          url: 'https://api.vimeo.com/categories',
          headers: {Authorization: 'Bearer effa86d0284056eacb391c194926a789'}
        }).then(function sucessCallback(responseCategories){
          return responseCategories;
        });
      }
    }
  }
  /*
   function generateCategoryLinks() {
   //Storing a link value for each
   }*/
})();
