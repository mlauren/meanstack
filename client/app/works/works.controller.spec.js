'use strict';

describe('Component: WorksComponent', function () {

  // load the controller's module
  beforeEach(module('portfolioApp'));

  var WorksComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    WorksComponent = $componentController('WorksComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
