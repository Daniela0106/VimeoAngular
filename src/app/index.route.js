(function() {
  'use strict';

  angular
    .module('vimeoAngular')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'vm',
        resolve:{
          /** @ngInject */
          videos: function (VideoFactory){
            return VideoFactory.getVideos();
          },
          categories: function (CategoryFactory) {
            return CategoryFactory.getCategories();
          }
        }
      })
      .state('detail', {
        url: '/detail',
        templateUrl: 'app/detail/detail.html',
        controller: 'MainController',
        controllerAs: 'vm'
      });

    $urlRouterProvider.otherwise('/');

  }

})();












