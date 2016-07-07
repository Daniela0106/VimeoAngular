(function() {
  'use strict';

  angular
    .module('vimeoAngular')
    .controller('MainController', MainController)
  //---------------------------- SHOW CATEGORIES -----------------------------------
  //On image ☰ click display category_container
  //On .closeX click hide category_container

  //--------------------------------------------------------------------------------

  /** @ngInject */
  function MainController(videos, categories) {
    var vm = this;

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
      var responseVideosArray = [];
      for (var i = 0; i < videoWord.length; i++) {
        responseVideosArray.push(videoWord[i]);
        videoWord[i] += " ";
      }

      var video_images_id = [];
      var video_image_id;
      var numberId;
      var imageURL = [];
      for (var k=0; k< responseVideosArray.length; ++k){
        if(responseVideosArray[k].indexOf("\"link\":\"https://i.vimeocdn.com/video/") != -1 ){ //If this part exists in the string
          video_image_id = responseVideosArray[k].split("_200x150").shift(); //*So that vid's id is @ the end
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
      //vm.video_image = "https://i.vimeocdn.com/video/" + video_images_id[0] + "_296x166.jpg";
      vm.video_images = imageURL;
      //return video_images_id;
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
  }
})();
