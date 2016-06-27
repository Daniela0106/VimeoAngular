(function() {
  'use strict';

  angular
    .module('vimeoAngular')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($http) {
    var vm = this;
    vm.recent_searches = ["Recipes", "Colombian music", "Sports", "Gospel"];

    //$http.post('https://api.vimeo.com/oauth/authorize/client', data, config).then(successCallback, errorCallback);


    $http({
      method: 'GET',
      url: 'https://api.vimeo.com/oauth/authorize/client'
    }).then(function successCallback(response) {
      vm.responses = response;
    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      vm.responses = "There was an error" + response;
    });
  }

})();
