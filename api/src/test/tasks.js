'use strict';

process.env.NODE_ENV = 'test';
console.log(process.env.NODE_ENV);

const assert = require('assert');
const should = require('should');
const request = require('supertest');

const mongoose = require('../db');
const app = require('../app');

describe('/tasks', function () {
  // before(function(done) {
  //   mongoose.connection.db.dropCollection('tasks', function(err, result) {
  //     if (err) return done(err);
  //     done();
  //   });
  // });
  //
  // let task = { title: 'A test todo' };
  //
  // describe('POST /tasks', function() {
  //   it('should create a new task resource and respond with the resource in JSON', function(done) {
  //     request(app)
  //       .post('/tasks')
  //       .set('Accept', 'application/json')
  //       .send(task)
  //       .expect('Content-Type', /json/)
  //       .expect(201)
  //       .end(function(err, res) {
  //         if (err) return done(err);
  //
  //         let data = res.body;
  //         let keys = ['id', 'title', 'high_priority', 'date', 'is_done', 'is_archived', 'created_at', 'updated_at'];
  //         keys.forEach(function (key, index) {
  //           data.should.have.property(key);
  //         });
  //         data.title.should.be.exactly(task.title).and.be.a.String();
  //         should.equal(data.date, task.date);
  //         data.high_priority.should.be.exactly(false);
  //         data.is_done.should.be.exactly(false);
  //         data.is_archived.should.be.exactly(false);
  //
  //         task = res.body;
  //         done();
  //       });
  //   });
  // });
  //
  // describe('GET /tasks/:id', function() {
  //   it('should respond with 404 for nonExistentId01', function(done) {
  //     request(app)
  //       .get('/tasks/nonExistentId01')
  //       .set('Accept', 'application/json')
  //       .expect('Content-Type', /json/)
  //       .expect(404)
  //       .end(function (err, res) {
  //         if (err) return done(err);
  //         done();
  //       });
  //   });
  //
  //   it('should respond with the json resource', function(done) {
  //     request(app)
  //       .get('/tasks/' + task.id)
  //       .set('Accept', 'application/json')
  //       .expect('Content-Type', /json/)
  //       .expect(200, task)
  //       .end(function (err, res) {
  //         if (err) return done(err);
  //         task = res.body;
  //         done();
  //       });
  //   });
  // });
  //
  // describe('PUT /tasks/:id', function() {
  //   it('should respond with 404 for nonExistentId01', function(done) {
  //     request(app)
  //       .put('/tasks/nonExistentId01')
  //       .set('Accept', 'application/json')
  //       .send({
  //         title: "An updated todo"
  //       })
  //       .expect('Content-Type', /json/)
  //       .expect(404)
  //       .end(function (err, res) {
  //         if (err) return done(err);
  //         done();
  //       });
  //   });
  //
  //   it('should update the resource and respond with resource in JSON', function(done) {
  //     request(app)
  //       .put('/tasks/' + task.id)
  //       .set('Accept', 'application/json')
  //       .send({
  //         title: "An updated todo"
  //       })
  //       .expect('Content-Type', /json/)
  //       .expect(200)
  //       .end(function (err, res) {
  //         if (err) return done(err);
  //
  //         let data = res.body;
  //
  //         data.id.should.be.exactly(task.id).and.be.a.String();
  //         data.title.should.be.exactly("An updated todo").and.be.a.String();
  //         data.is_done.should.be.exactly(task.is_done).and.be.a.Boolean();
  //         data.is_archived.should.be.exactly(task.is_archived).and.be.a.Boolean();
  //         data.high_priority.should.be.exactly(task.high_priority).and.be.a.Boolean();
  //         should.equal(data.date, task.date);
  //         data.created_at.should.be.exactly(task.created_at).and.be.a.Number();
  //         data.updated_at.should.not.equal(task.updated_at).and.be.a.Number();
  //
  //         task = res.body;
  //         done();
  //       });
  //   });
  // });
  //
  // let anotherTask = { title: "this is a new task" };
  //
  // describe('POST /tasks', function() {
  //   it('should create a new task resource and respond with the resource in JSON', function(done) {
  //     request(app)
  //       .post('/tasks')
  //       .set('Accept', 'application/json')
  //       .send(anotherTask)
  //       .expect('Content-Type', /json/)
  //       .expect(201)
  //       .end(function(err, res) {
  //         if (err) return done(err);
  //
  //         let data = res.body;
  //         let keys = ['id', 'title', 'high_priority', 'date', 'is_done', 'is_archived', 'created_at', 'updated_at'];
  //         keys.forEach(function (key, index) {
  //           data.should.have.property(key);
  //         });
  //         data.title.should.be.exactly(anotherTask.title).and.be.a.String();
  //         should.equal(data.date, anotherTask.date);
  //         data.high_priority.should.be.exactly(false);
  //         data.is_done.should.be.exactly(false);
  //         data.is_archived.should.be.exactly(false);
  //
  //         anotherTask = res.body;
  //         done();
  //       });
  //   });
  //
  //   it('should respond with the multiple json resources', function(done) {
  //     request(app)
  //       .get('/tasks/')
  //       .set('Accept', 'application/json')
  //       .expect('Content-Type', /json/)
  //       .expect(200, [task, anotherTask])
  //       .end(function (err, res) {
  //         if (err) return done(err);
  //         done();
  //       });
  //   });
  // });
  //
  // describe('DELETE /tasks/:id', function() {
  //   it('should respond with 404 for nonExistentId01', function(done) {
  //     request(app)
  //       .del('/tasks/nonExistentId01')
  //       .set('Accept', 'application/json')
  //       .expect('Content-Type', /json/)
  //       .expect(404)
  //       .end(function (err, res) {
  //         if (err) return done(err);
  //         done();
  //       });
  //   });
  //
  //   it('should respond with 200', function(done) {
  //     request(app)
  //       .del('/tasks/' + task.id)
  //       .set('Accept', 'application/json')
  //       .expect('Content-Type', /json/)
  //       .expect(200)
  //       .end(function (err, res) {
  //         if (err) return done(err);
  //         done();
  //       });
  //   });
  //
  //   it('should respond 404 because the resource has been deleted', function(done) {
  //     request(app)
  //       .get('/tasks/' + task.id)
  //       .set('Accept', 'application/json')
  //       .expect('Content-Type', /json/)
  //       .expect(404)
  //       .end(function (err, res) {
  //         if (err) return done(err);
  //         done();
  //       });
  //   });
  // });
});
