(function() {
  'use strict';

  angular
    .module('vimeoAngular')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($http) {
    var vm = this;
    //vm.search_history = ["Recipes", "Colombian music", "Sports", "Gospel"];

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
      vm.category_responses = responseArray;

      //--------------------- GET CATEGORIES' NAMES ------------------------------
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
    //------------------------------------------------------------------------------

    $http({
      method: 'GET',
      url: 'https://api.vimeo.com/categories/animation/videos?per_page=12',
      headers: {Authorization: 'Bearer effa86d0284056eacb391c194926a789'}
    }).then(function successCallback(responseVideos) {
      vm.responseVideos = responseVideos;
      var str = JSON.stringify(vm.responseVideos);
      var videoWord = str.split("/categories/");
      var responseVideosArray = [];
      for (var i = 0; i < videoWord.length - 1; i++) {
        responseVideosArray.push(videoWord[i]);
        videoWord[i] += " ";
      }
      vm.response_videos = responseVideosArray;
    });

    //I NEED TO INVOKE THIS VARIABLE FROM THE DOM
    vm.video_ejemplo = "https://player.vimeo.com/video/108650530?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0";
    //per_page=12&offset=
  }


  //---------------------------- SHOW CATEGORIES -----------------------------------
  //On image ☰ click display category_container
  //On .closeX click hide category_container

  //--------------------------------------------------------------------------------

})();
