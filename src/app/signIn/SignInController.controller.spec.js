(function() {
  'use strict';

  describe('controllers', function(){
    var controller;
    var configuration;

    beforeEach(module('app'));
    beforeEach(inject(function(_$controller_, _configuration_) {
      // spyOn(_webDevTec_, 'getTec').and.returnValue([{}, {}, {}, {}, {}]);
      // spyOn(_toastr_, 'info').and.callThrough();

      controller = _$controller_('SignInController');
      configuration = _configuration_;

    }));

    it('should have multiStep mode defined', function() {

      expect(controller.multiStep).toBeDefined();
    });

    it('should have access to configuration', function() {

      expect(configuration.examServiceURI).toBeDefined();
    });



  });
})();
