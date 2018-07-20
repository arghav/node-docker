const request = require('supertest');
const mongoose = require('mongoose');

const db = require('../../db');
const app = require('../../app');

const TASKS_ROUTE = '/api/tasks';

describe('tasks', () => {
  beforeAll(async (done) => {
    await db.connect();

    // NOTE: Silently continue if the collection doesn't exist
    await mongoose.connection.dropCollection('tasks').catch(() => done());
  });

  afterAll(async () => {
    await mongoose.connection.dropCollection('tasks');
    await db.disconnect();
  });

  test('GET: should respond with the an empty array', async () => {
    await request(app)
      .get(TASKS_ROUTE)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, []);
  });

  let task = { title: 'A test todo' };

  test('POST: should create a new resource on post', async () => {
    await request(app)
      .post(TASKS_ROUTE)
      .set('Accept', 'application/json')
      .send(task)
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response) => {
        const { body: data } = response;

        const keys = ['id', 'title', 'high_priority', 'date', 'is_done', 'is_archived', 'created_at', 'updated_at'];
        keys.forEach(function (key, index) {
          expect(data).toHaveProperty(key)
        });
        expect(data.title).toBe(task.title);
        expect(data.date).toEqual(null);
        expect(data.high_priority).toBe(false);
        expect(data.is_done).toBe(false);
        expect(data.is_archived).toBe(false);

        task = data;
      });
  });

  test('GET: should respond with 404 for nonExistentId01', async () => {
    await request(app)
      .get(`${TASKS_ROUTE}/nonExistentId01`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404);
  });

  test('GET: should respond with the json resource', async () => {
    await request(app)
      .get(`${TASKS_ROUTE}/${task.id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, task)
      .then((response) => {
        const { body: data } = response;

        const keys = ['id', 'title', 'high_priority', 'date', 'is_done', 'is_archived', 'created_at', 'updated_at'];
        keys.forEach(function (key, index) {
          expect(data).toHaveProperty(key)
        });
        expect(data.title).toBe(task.title);
        expect(data.date).toEqual(null);
        expect(data.high_priority).toBe(false);
        expect(data.is_done).toBe(false);
        expect(data.is_archived).toBe(false);

        task = data;
      });
  })

  test('PUT: should respond with 404 for nonExistentId01', async () => {
    await request(app)
      .put(`${TASKS_ROUTE}/nonExistentId01`)
      .set('Accept', 'application/json')
      .send({
        title: "An updated todo"
      })
      .expect('Content-Type', /json/)
      .expect(404);
  });

  test('PUT: should update the resource and respond with resource in JSON', async () => {
    await request(app)
      .put(`${TASKS_ROUTE}/${task.id}`)
      .set('Accept', 'application/json')
      .send({
        title: "An updated todo"
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        const data = response.body;

        expect(data.title).toBe('An updated todo');
        expect(data.updated_at).not.toEqual(task.updated_at);
      });
  });

  let anotherTask = { title: "this is a new task" };

  test('POST: should create a new task resource and respond with the resource in JSON', async () => {
    await request(app)
      .post(TASKS_ROUTE)
      .set('Accept', 'application/json')
      .send(anotherTask)
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response) => {
        const { body: data } = response;

        const keys = ['id', 'title', 'high_priority', 'date', 'is_done', 'is_archived', 'created_at', 'updated_at'];
        keys.forEach(function (key, index) {
          expect(data).toHaveProperty(key)
        });
        expect(data.title).toBe(anotherTask.title);
        expect(data.date).toEqual(null);
        expect(data.high_priority).toBe(false);
        expect(data.is_done).toBe(false);
        expect(data.is_archived).toBe(false);

        anotherTask = data;
      });
  });

  test('GET: should respond with the multiple json resources', async () => {
    await request(app)
      .get(TASKS_ROUTE)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.length).toBe(2);
      });
  });

  test('DELETE: should respond with 404 for nonExistentId01', async () => {
    await request(app)
      .del(`${TASKS_ROUTE}/nonExistentId01`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404);
  });

  test('DELETE: should respond with 200', async () => {
    await request(app)
      .del(`${TASKS_ROUTE}/${task.id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
  });

  test('DELETE: should respond 404 because the resource has been deleted', async () => {
    await request(app)
      .get(`${TASKS_ROUTE}/${task.id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404);
  });
});
