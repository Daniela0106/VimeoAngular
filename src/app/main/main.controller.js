(function() {
  'use strict';

  angular
    .module('vimeoAngular')
    .controller('MainController', MainController);


  /** @ngInject */
  function MainController($http) {
    var vm = this;
    vm.recent_searches = ["Recipes", "Colombian music", "Sports", "Gospel"];

    //--------------------- GET CATEGORIES NAMES ---------------------------
    $http({
      method: 'GET',
      url: 'https://api.vimeo.com/categories',
      headers: {Authorization: 'Bearer effa86d0284056eacb391c194926a789'}
    }).then(function successCallback(response) {
      vm.responses = response; //JSON response
      var str = JSON.stringify(vm.responses);//strResponse;
      var words = str.split("/categories/");
      var responseArray = [];
      for (var i = 0; i < words.length - 1; i++) {
        responseArray.push(words[i] + "***");
        words[i] += " ";
      }
      //vm.responses = responseArray;

      var categories = [];
      var categoryName;
      for(var j=0; j< ((responseArray.length)); ++j){
        if(responseArray[j].indexOf("/channels") != -1){
          categoryName = responseArray[j].split("/channels").shift();
          categories.push(categoryName);
        }
      }
      vm.responses = categories;


    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      vm.responses = "There was an error" + response;
    });
    //----------------------------------------------------------------------
  }

})();

/*
* STEPS:
* 1. Make a direct request to the Vimeo API to create a public access token.
* 2. The application merely requests an access token by sending its credentials,
* its client ID, and client secret, to the authorization server.
* */
