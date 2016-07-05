(function() {
  'use strict';

  angular
    .module('vimeoAngular')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('main', {
        url: '/main',
        //abstract: true,
        params:{
          page : '1'
        },
        resolve:{
          /* @ngInject */
          categories: function (CategoryFactory){
            return CategoryFactory.getCategories();
          }
        },
        views: {
          '@': {
            templateUrl: 'app/main/main.html',
            controller: 'MainController',
            controllerAs: 'vm'
          }
        }
      })
      .state('main.category',{
        url: '/main/category',
        resolve:{
          /* @ngInject */
          responseVideos: function (VideoFactory) {
            return VideoFactory.getVideos();
          }
        },
      views: {
        '@': {
          templateUrl: 'app/main/main.html',
          controller: 'MainController',
          controllerAs: 'vm'
        }
      }
      })
      .state('detail', {
        url: '/detail',
        //resolve:{
         //aqui iba ng inject
         /* videoDetails : function (VideoDetails) {
            return VideoDetails.getDetails();
          }*/
        //},
        views: {
          '@': {
            templateUrl: 'app/detail/detail.html',
            controller: 'MainController',
            controllerAs: 'vm'
          }
        }
      });
    $urlRouterProvider.otherwise('/main');
  }
})();
