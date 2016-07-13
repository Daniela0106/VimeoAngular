(function() {
  'use strict';

  angular
    .module('vimeoAngular')
    .controller('MainController', MainController)

  /** @ngInject */
  function MainController(videos, categories, vimeoConfig) {
    var vm = this;
    vm.myVideosArray = [];
    vm.responseVideos = videos;
    vm.video_images = [];
    vm.responses = categories;
    vm.getVideos = getVideos;
    vm.getCategories = getCategories;
    vm.getVideos();
    vm.getCategories();

    /** @ngInject */
    function CreateVideo(){
      var myVideos = [];
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
    }

    function getCategories() {
      var str = JSON.stringify(vm.responses); //Converting the JSON to String
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

    function getVideos(){
      var str = JSON.stringify(vm.responseVideos);
      var videoWord = str.split("embed_presets"); //*To have info split by video. This is the last element in the object

      videoName(videoWord);/*-* GET VIDEO'S NAME *-*/
      videoImage(videoWord);/*-* GET VIDEO'S IMAGE *-*/
      videoChannelPic(videoWord); /*-* GET CHANNEL'S PICTURE *-*/

      var videoChannelName = "";
      var videosChannelsNames = [];

      for(var m=0; m<videoWord.length; ++m){
       // if(videoWord[i].indexOf(vimeoConfig.FIRST_PART_URL) != -1 ){
       // }
       /*
       "user":{"uri":"/users/5967139","name":"InfinityList",
       *
       *
       * */

      }
      vm.videos_channels_names = videoWord;
    }

    function videoName(videoWord){
      var videosNames = [];
      var videoName = "";
      var namePosition = 0;
      for(var i=0 ; i < videoWord.length; ++i){
        if(videoWord[i].indexOf(vimeoConfig.FIRST_PART_URL) != -1 ){ //If this part exists in the string
          videoName = videoWord[i].split("\",\"description\":\"").shift();
          videoName = videoName.substr(videoName.length - 200);//Just to get a shorter string. Max name length: 130 chars
          namePosition = videoName.lastIndexOf("\",\"name\":\"");
          videoName = videoName.substring(namePosition, videoName.length);
          videoName = videoName.slice(10); //Removes the part of "name":"
          videosNames.push(videoName);
        }
      }
      vm.videos_names = videosNames;
    }

    function videoImage(videoWord) {
      var video_images_id = [];
      var video_image_id;
      var numberId;
      var imageURL = [];
      for (var k=0 ; k< videoWord.length ; ++k){
        if(videoWord[k].indexOf(vimeoConfig.FIRST_PART_URL) != -1 ){ //If this part exists in the string
          video_image_id = videoWord[k].split("_200x150").shift(); //*So that vid's id is at the end
          numberId = video_image_id.substr(video_image_id.length-9); //takes the last 9 characters. Vid's Id belong here
          if( numberId.charAt( 0 ) === '/' ){//If the first char in the string is an "/" then remove it
            numberId = numberId.slice( 1 );
          }
          video_images_id.push(numberId);
        }
      }
      for(var numberVideos=0; numberVideos < video_images_id.length; ++numberVideos ){
        imageURL.push(vimeoConfig.FIRST_PART_URL + "video/"+ video_images_id[numberVideos]+ "_296x166.jpg");
      }
      vm.video_images = imageURL;
    }

    function videoChannelPic(videoWord){ //It is necessary to resize it with scss
      var channelImageId = [];
      var channelPicturesURL = [];
      var channelPictureURL = "";
      for(var j=0; j< videoWord.length; ++j){
        if(videoWord[j].indexOf("/portrait/") != -1){
          channelPictureURL = videoWord[j].split("_30x30?r=pad").shift();
          channelImageId = channelPictureURL.substr(channelPictureURL.length-7); //takes the last 9 characters. Vid's Ids belong here
          if( channelImageId.charAt( 0 ) === '/' ){//If the first char in the string is an "/" then remove it
            channelImageId = channelImageId.slice( 1 );
          }
          channelPicturesURL.push(vimeoConfig.FIRST_PART_URL + "portrait/" + channelImageId);
        }
      }
      vm.channel_pictures = channelPicturesURL;
    }

    function getVideosChannels() {

    }
  
    function getTimeOfPublish() {

    }

    function getDescription(){

    }

    function getViews() {

    }
  }
})();


//Check how to make on JSON data.data.length:

/*
var data = /* your parsed JSON here
var numberOfElements = data.food.length;
 {"food":[
 {
 "name"       :"Belgian Waffles",
 "price"      :"$5.95",
 "description":"two of our famous Belgian Waffles with plenty of real maple syrup",
 "calories"   :"650"
 },
 {
 "name"       :"Strawberry Belgian Waffles",
 "price"      :"$7.95",
 "description":"light Belgian waffles covered with strawberries and whipped cream",
 "calories"   :"900"
 },
 {
 "name"       :"Berry-Berry Belgian Waffles",
 "price"      :"$8.95",
 "description":"light Belgian waffles covered with an assortment of fresh berries and whipped cream",
 "calories"   :"900"
 }
 ]}
* */
