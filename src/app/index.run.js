//*-* THIS FILE CONTAINS THINGS THAT EXECUTE ONCE THROUGHOUT THE APP *-*

(function() { //Is an encapsulated anonymous function, a "self-invoking expression"
  'use strict';

  angular
    .module('vimeoAngular')
    .run(/*runBlock*/);
/*
  /** @ngInject
  function runBlock($http, vimeoConfig) {
    //$http.defaults.headers.common.Authorization = 'Bearer ' + vimeoConfig.ACCESS_TOKEN;
  }*/
}());
