//Channel's pics: https://i.vimeocdn.com/portrait/
(function() {
  'use strict';

  angular
    .module('vimeoAngular')
    .controller('MainController', MainController)

  /** @ngInject */
  function MainController(videos, categories) {
    var vm = this;

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

    vm.myVideosArray = [];

    vm.responseVideos = videos;
    vm.video_images = [];

    vm.responses = categories;

    vm.getVideos = getVideos;
    vm.getCategories = getCategories;

    vm.getVideos();
    vm.getCategories();

    function getVideos(){
      var str = JSON.stringify(vm.responseVideos);
      var videoWord = str.split("iframe"); //*To have info split by video
      var video_images_id = [];
      var video_image_id;
      var numberId;
      var imageURL = [];
      for (var k=0; k< videoWord.length; ++k){
        if(videoWord[k].indexOf("\"link\":\"https://i.vimeocdn.com/video/") != -1 ){ //If this part exists in the string
          video_image_id = videoWord[k].split("_200x150").shift(); //*So that vid's id is @ the end
          numberId = video_image_id.substr(video_image_id.length-9); //takes the last 9 characters. Vid's Id belong there
          //If the first char in the string is an "/" then remove it...
          if( numberId.charAt( 0 ) === '/' )
            numberId = numberId.slice( 1 );
          video_images_id.push(numberId);
        }
      }
      for(var numberVideos=0; numberVideos < video_images_id.length; ++numberVideos ){
        imageURL.push("https://i.vimeocdn.com/video/" + video_images_id[numberVideos]+ "_296x166.jpg");
      }

      vm.video_images = imageURL;


      //*-* GET CHANNEL PICTURE*-*
      vm.channel_picture= "";
      vm.channel_pictures= "";

    }

    function getCategories() {
      var str = JSON.stringify(vm.responses);//Converting the JSON to String
      var chunksOfResponse = str.split("/categories/");
      var categories = [];
      var categoryName;
      for (var j = 0; j < ((chunksOfResponse.length)); ++j) {
        if (chunksOfResponse[j].indexOf("/channels") != -1) {
          categoryName = chunksOfResponse[j].split("/channels").shift();
          categories.push(categoryName);
        }
      }
      vm.responses = categories;
    }
  }
})();
