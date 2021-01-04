/* global _:false, moment:false, CryptoJS:false */
(function() {
  'use strict';

  angular
    .module('app')
    .constant('_', _)
    .constant('CryptoJS', CryptoJS)
    .constant('moment', moment);

})();
