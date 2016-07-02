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
  function MainController() {
    var vm = this;
    return vm;
  }

})();
