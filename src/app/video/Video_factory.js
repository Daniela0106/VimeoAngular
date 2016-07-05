(function(){
  angular.module('vimeoAngular')
    .factory('VideoFactory', VideoFactory);

  /** @ngInject */
  function VideoFactory($http){
    var vm = this;
    return {
      getVideos: function(){

        //-------------------------- VIDEOS' IMAGES --------------------------------
        $http({
          method: 'GET',
          url: 'https://api.vimeo.com/categories/art/videos?per_page=12',
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
          var imageURL = [];
          for (var k=0; k< responseVideosArray.length; ++k){
            if(responseVideosArray[k].indexOf("\"link\":\"https://i.vimeocdn.com/video/") != -1 ){ //If this part exists in the string
              video_image_id = responseVideosArray[k].split("_200x150").shift(); //*So that vid's id is @ the end
              numberId = video_image_id.substr(video_image_id.length-9); //takes the last 9 characters. Vid's Id belong there
              //If the first char in the string is an / then remove it...
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
          vm.response_videos = (video_images_id);//<------ DEL
          return video_images_id;
        });
      }
    }
  }
})();
