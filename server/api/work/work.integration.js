'use strict';

var app = require('../..');
import request from 'supertest';

var newWork;

describe('Work API:', function() {

  describe('GET /y', function() {
    var works;

    beforeEach(function(done) {
      request(app)
        .get('/y')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          works = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      works.should.be.instanceOf(Array);
    });

  });

  describe('POST /y', function() {
    beforeEach(function(done) {
      request(app)
        .post('/y')
        .send({
          name: 'New Work',
          info: 'This is the brand new work!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newWork = res.body;
          done();
        });
    });

    it('should respond with the newly created work', function() {
      newWork.name.should.equal('New Work');
      newWork.info.should.equal('This is the brand new work!!!');
    });

  });

  describe('GET /y/:id', function() {
    var work;

    beforeEach(function(done) {
      request(app)
        .get('/y/' + newWork._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          work = res.body;
          done();
        });
    });

    afterEach(function() {
      work = {};
    });

    it('should respond with the requested work', function() {
      work.name.should.equal('New Work');
      work.info.should.equal('This is the brand new work!!!');
    });

  });

  describe('PUT /y/:id', function() {
    var updatedWork;

    beforeEach(function(done) {
      request(app)
        .put('/y/' + newWork._id)
        .send({
          name: 'Updated Work',
          info: 'This is the updated work!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedWork = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedWork = {};
    });

    it('should respond with the updated work', function() {
      updatedWork.name.should.equal('Updated Work');
      updatedWork.info.should.equal('This is the updated work!!!');
    });

  });

  describe('DELETE /y/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/y/' + newWork._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when work does not exist', function(done) {
      request(app)
        .delete('/y/' + newWork._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
