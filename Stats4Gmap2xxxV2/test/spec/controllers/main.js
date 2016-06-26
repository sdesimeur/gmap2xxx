'use strict';


describe('Controller: MainCtrl', function () {


    // load the controller's module
    
    beforeEach(module('stats4Gmap2xxxV2App'));
    
    var MainCtrl,
      scope;
    
    // Initialize the controller and a mock scope
    
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        MainCtrl = $controller('MainCtrl', {
          $scope: scope
        });
    }));


    it('scope.req should be an array but ', function () {
        expect(typeof(scope.reqs)).toBe('object');
    });
    
});
