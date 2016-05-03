'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var workCtrlStub = {
  index: 'workCtrl.index',
  show: 'workCtrl.show',
  create: 'workCtrl.create',
  update: 'workCtrl.update',
  destroy: 'workCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var workIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './work.controller': workCtrlStub
});

describe('Work API Router:', function() {

  it('should return an express router instance', function() {
    workIndex.should.equal(routerStub);
  });

  describe('GET /y', function() {

    it('should route to work.controller.index', function() {
      routerStub.get
        .withArgs('/', 'workCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /y/:id', function() {

    it('should route to work.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'workCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /y', function() {

    it('should route to work.controller.create', function() {
      routerStub.post
        .withArgs('/', 'workCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /y/:id', function() {

    it('should route to work.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'workCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /y/:id', function() {

    it('should route to work.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'workCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /y/:id', function() {

    it('should route to work.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'workCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
