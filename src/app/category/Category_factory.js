(function(){
  'use strict';

  angular
    .module('vimeoAngular')
    .factory('CategoryFactory', CategoryFactory);

  /** @ngInject */
  function CategoryFactory($http) {
    var vm = this;
      return {
        getCategories: function () {
          $http({
            method: 'GET',
            url: 'https://api.vimeo.com/categories',
            headers: {Authorization: 'Bearer effa86d0284056eacb391c194926a789'}
          }).then(function successCallback(response) {
            vm.responses = response;               //JSON response
            var str = JSON.stringify(vm.responses);//Converting the JSON to String
            var chunksOfResponse = str.split("/categories/");
            var responseArray = [];
            for (var i = 0; i < chunksOfResponse.length; i++) {
              responseArray.push(chunksOfResponse[i]);
              chunksOfResponse[i] += " ";
            }
            //vm.category_responses = responseArray;
            var categories = [];
            var categoryName;
            for (var j = 0; j < ((responseArray.length)); ++j) {
              if (responseArray[j].indexOf("/channels") != -1) {
                categoryName = responseArray[j].split("/channels").shift();
                categories.push(categoryName);
              }
            }
            vm.responses = categories;
          }, function errorCallback(response) {//Clled asynchly if error or srvr rtrns rspns w error status.
            vm.responses = "There was an error while loading the Categories" + response;
            return vm.responses;
          });
        }
      }


  }
  /*
   function generateCategoryLinks() {
   //Storing a link value for each
   }*/
})();
