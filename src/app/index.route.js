(function() {
  'use strict';

  angular
    .module('vimeoAngular')
    .controller('MainController',MainController)
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'vm'
      })
      .state('detail', {
        url: '/detail',
        templateUrl: 'app/detail/detail.html',
        controller: 'MainController',
        controllerAs: 'vm'
      });

    $urlRouterProvider.otherwise('/');

  }

  /** @ngInject */
  function MainController($http) {
    var vm = this;

    //--------------------- GET CATEGORIES' NAMES ----------------------------
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
      //vm.category_responses = responseArray; arreglo completo de las categorías
      var categories = [];
      var categoryName;
      for (var j = 0; j < ((responseArray.length)); ++j) {
        if (responseArray[j].indexOf("/channels") != -1) {
          categoryName = responseArray[j].split("/channels").shift();
          categories.push(categoryName);
        }
      }
      vm.responses = categories;
    }, function errorCallback(response){//Clled asynchly if error or srvr rtrns rspns w error status.
      vm.responses = "There was an error while loading the Categories" + response;
    });
    //--------------------------------------------------------------------------

    //-------------------------- VIDEOS' IMAGES --------------------------------
    $http({
      method: 'GET',
      url: 'https://api.vimeo.com/categories/animation/videos?per_page=12',
      headers: {Authorization: 'Bearer effa86d0284056eacb391c194926a789'}
    }).then(function successCallback(responseVideos) {
      vm.responseVideos = responseVideos; //JSON response
      var str = JSON.stringify(vm.responseVideos);
      var videoWord = str.split("iframe"); //*To have info split by video
      var responseVideosArray = [];
      for (var i = 0; i < videoWord.length; i++) {
        responseVideosArray.push(videoWord[i]);
        videoWord[i] += " ";
      }

      var video_images_id = [];
      var video_image_id;
      var numberId;
      for (var k=0; k< responseVideosArray.length; ++k){
        if(responseVideosArray[k].indexOf("\"link\":\"https://i.vimeocdn.com/video/") != -1){ //If this part exists in the string
          video_image_id = responseVideosArray[k].split("_200x150").shift(); //*So that vid's id is @ the end
          numberId = video_image_id.substr(video_image_id.length-9); //takes the last 20 characters
          //If the first char in the string is an / then remove it...
          if( numberId.charAt( 0 ) === '/' )
            numberId = numberId.slice( 1 );
          video_images_id.push(numberId);
        }
      }

      vm.response_videos = video_images_id;//<------ DEL
    });
    //src=https://i.vimeocdn.com/video
    //--------------------------------------------------------------------------
  }
})();
//https://i.vimeocdn
