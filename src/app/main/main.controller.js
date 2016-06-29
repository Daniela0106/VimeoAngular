(function() {
  'use strict';

  angular
    .module('vimeoAngular')
    .controller('MainController', MainController);


  /** @ngInject */
  function MainController($http) {
    var vm = this;
    vm.search_history = ["Recipes", "Colombian music", "Sports", "Gospel"];

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
        responseArray.push(words[i]);
        words[i] += " ";
      }
      vm.recent_searches = responseArray;

      //--------------------- GET CATEGORIES NAMES ------------------------------
      var categories = [];
      var categoryName;
      for (var j = 0; j < ((responseArray.length)); ++j) {
        if (responseArray[j].indexOf("/channels") != -1) {
          categoryName = responseArray[j].split("/channels").shift();
          categories.push(categoryName);
        }
      }
      vm.responses = categories;

    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      vm.responses = "There was an error while loading the Categories" + response;
    });
    //----------------------------------------------------------------------------
  }


  //---------------------------- SHOW CATEGORIES ---------------------------------

  function showCategories(){
    var categoriesDisplay = document.getElementsByClassName("category_container");
    if (categoriesDisplay.style.display !== "none") {
      categoriesDisplay.style.display = "block";
    }else{
      categoriesDisplay.style.display = "none";
    }
  }
  $(document).ready(function(){
    $(".hamburger").click(function(){
      $(".category_container").show();
    });
  });
  //------------------------------------------------------------------------------

})();
