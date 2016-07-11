(function() {
  'use strict';

  angular
    .module('vimeoAngular')
    .controller('MainController', MainController)

  /** @ngInject */
  function MainController(videos, categories) {

    var myVideo = {
      pictureURL:"",
      name:"",
      channelPictureURL:"",
      channelName:"",
      timeOfPublishing:"",
      description : "",
      views : "",
      likes : "",
      timesShared : "",
      timesCommented : ""
    };

    var vm = this;

    vm.myVideosArray = [];

    vm.responseVideos = videos;
    vm.video_images = [];

    vm.responses = categories;

    vm.video_names = [];

    vm.getVideos = getVideos;
    vm.getCategories = getCategories;
    /*vm.openNav = openNav;
    vm.closeNav = closeNav;*/

    vm.getVideos();
    vm.getCategories();

    /*vm.openNav();
    vm.closeNav();*/

    function getVideos(){
      //*-* GET VIDEO'S IMAGES *-*//
      var str = JSON.stringify(vm.responseVideos);
      var rawResponse = str.split("iframe"); //*To have info split by video
      var responseSplitByVideo = [];
      for (var i = 0; i <  rawResponse.length; i++) {
        responseSplitByVideo.push( rawResponse[i] );
         rawResponse[i] += " ";
       }
      var videoImagesId = [];
      var videoImageId;
      var videoNumberId;
      var imageURL = [];
      for (var k=0; k< responseSplitByVideo.length; ++k){
        if(responseSplitByVideo[k].indexOf("https://i.vimeocdn.com/video/") != -1 ){ //If this part exists in the string
          videoImageId = responseSplitByVideo[k].split("_200x150").shift(); //*So that vid's id is @ the end, removes info after _200x150
          videoNumberId = videoImageId.substr(videoImageId.length-9); //takes the last 9 characters. Vid's Id belong there
          if( videoNumberId.charAt( 0 ) === '/' ){//If first char in the string is a "/" then remove it
            videoNumberId = videoNumberId.slice( 1 );
            videoImagesId.push(videoNumberId);
          }
        }
      }
      for(var numberVideos=0; numberVideos < videoImagesId.length; ++numberVideos ){
        imageURL.push("https://i.vimeocdn.com/video/" + videoImagesId[numberVideos]+ "_296x166.jpg");
      }
      vm.video_images = imageURL;

      //*-* GET VIDEO'S NAMES *-*//
      var videoName;/*
      for (var m=0; m< responseSplitByVideo.length; ++m){
        if(responseSplitByVideo[m].indexOf("description\":\"") != -1 ){
          videoName = responseSplitByVideo[m].split("\","description");
        }
      }*/
      vm.video_names= responseSplitByVideo;
    }

    function getCategories() {
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
    }
    /*
    function openNav(){
      document.getElementById("mySidenav").style.width = "250px";
    }

    function closeNav(){
      document.getElementById("mySidenav").style.width = "0";
    }*/
  }
})();

//Channel's pics: https://i.vimeocdn.com/portrait/
