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

      videoName(videoWord);       /*-* GET VIDEO'S NAME *-*/
      videoImage(videoWord);      /*-* GET VIDEO'S IMAGE *-*/
      videoChannelPic(videoWord); /*-* GET CHANNEL'S PICTURE *-*/
      videoUserName(videoWord);   /*-* GET USER'S CHANNEL NAME *-*/
      videoDateOfPublish(videoWord); /*-* GET VIDEO'S RELEASE/PUBLISH DATE *-*/

      var description = "";
      var descriptions = [];

      vm.descriptions = videoWord;


    }

    function videoName(videoWord){
      var videoName = "";
      var videosNames = [];
      var namePosition = 0;
      for(var i = 0 ; i < videoWord.length ; ++i){
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
      var video_image_id;
      var video_images_id = [];
      var numberId;
      var imageURL = [];
      for (var k = 0 ; k < videoWord.length ; ++k){
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
      var channelPictureURL = "";
      var channelPicturesURL = [];
      for(var j = 0 ; j < videoWord.length ; ++j){
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

    function videoUserName(videoWord) {
      var videoChannelName = "";
      var videosChannelsNames = [];
      var searchPosition = 0;
      for(var m = 0 ; m < videoWord.length ; ++m){
        if(videoWord[m].indexOf(vimeoConfig.FIRST_PART_URL) != -1 ){
          searchPosition = videoWord[m].indexOf( "\"}}},\"user\":{\"uri\":\"/users/" ); //Removing everything before this
          videoChannelName = videoWord[m].slice( searchPosition, videoWord[m].length); // ▲
          searchPosition = videoChannelName.indexOf("\",\"name\":\"");
          //Next, I add 10 because ","name":" is the first part of the string
          videoChannelName = videoChannelName.slice( searchPosition +10 , videoChannelName.length);//Now user's name is the first part of str
          videoChannelName = videoChannelName.split("\",\"link\":\"").shift(); //Removes from this on
          videosChannelsNames.push(videoChannelName);
        }
      }
      vm.videos_channels_names = videosChannelsNames;
    }

    function videoDateOfPublish(videoWord) {
      var dateOfPublish = "";
      var datesOfPublish = [];
      var searchIndex = 0;
      var datesInFormatSince = []; //THIS IS THE DATE ARRAY THAT DISPLAYS
      var dateToBePrinted = "";

      for(var w = 0 ; w < videoWord.length ; ++w){
        //dateOfPublish = videoWord[w].split("content").shift(); //Removes from this on
        searchIndex = videoWord[w].indexOf("release_time\":");
        dateOfPublish = videoWord[w].slice(searchIndex +15, videoWord[w].length); //+15 to remove the "release time" part
        dateOfPublish = dateOfPublish.split("T").shift();
        if(Number.isInteger(parseInt(dateOfPublish.charAt(0)))){ //if the first char in string is an number
          var dateInFormat = "'"+dateOfPublish+"'";
          var d = new Date (dateInFormat); //In javascript's official date format

          (function(){
            var currentDate = new Date();
            var videoDate = new Date (dateInFormat);

            if(videoDate === currentDate){
              //today
            }else{
              if(videoDate.getYear() !== currentDate.getYear()){//Since the year difference
                if((currentDate.getYear() - videoDate.getYear()) == 1){
                  dateToBePrinted = "Since " + (currentDate.getYear() - videoDate.getYear()) + " year";
                }else{
                  dateToBePrinted = "Since " + (currentDate.getYear() - videoDate.getYear()) + " years";
                }

              }
              else{//Since the month difference
                if(videoDate.getMonth() !== currentDate.getMonth()){
                  if((currentDate.getMonth() - videoDate.getMonth()) == 1){
                    dateToBePrinted = "Since " + (currentDate.getMonth() - videoDate.getMonth) + " month";
                  }else{
                    dateToBePrinted = "Since " + (currentDate.getMonth() - videoDate.getMonth()) + " months";
                  }
                }
                else{ //Since x days
                  if((currentDate.getDate() - videoDate.getDate()) == 1) {
                    dateToBePrinted = "Since " + (currentDate.getDate() - videoDate.getDate()) + " day";
                  }else{
                    dateToBePrinted = "Since " + (currentDate.getDate() - videoDate.getDate()) + " days";
                  }
                }
              }
            }
          })();
          datesOfPublish.push(d.toDateString()); //So it prints a beautiful date (it is not yet "Since 4 years...")
          datesInFormatSince.push(dateToBePrinted);
        }
      }
      vm.dates_of_publish = datesInFormatSince;
      //vm.dates_of_publish = datesOfPublish; //This is the beautiful one, that will go on the hover :)
    }

    function getDescription(){

    }

    function getViews() {

    }
  }
})();


//Check how to make on JSON data.data.length:
