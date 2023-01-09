// Ensure that our environment is set to "test"
process.env.NODE_ENV = "test";

const expect = require("chai").expect;
const request = require("supertest");
const app = require("../app");

const db = require("../models");
const todoFixtures = require("../fixtures/todos")

const Todo = db.todos;

describe("api/todos", () => {
  before(async () => {
    await Todo.sync();
    await Todo.bulkCreate(todoFixtures);
  });

  after(async () => {
    await Todo.destroy({
      where: {},
      truncate: true
    })
  });

  describe("GET /", () => {
    it("should return all todos", async () => {
      const res = await request(app).get("/todos");

      expect(res.status).to.equal(200);
      expect(res.body.length).to.equal(todoFixtures.length);
    });
  });

  describe("GET/:id", () => {
    it("should return a todo if valid id is passed", async () => {
      const res = await request(app).get(`/todos/${todoFixtures[0].id}`);

      expect(res.status).to.equal(200);

      expect(res.body).to.have.property(
        "title",
        todoFixtures[0].title);

      expect(res.body).to.have.property(
        "completed",
        todoFixtures[0].completed ? true : false);
    });

    it("should return 404 error when invalid object id is passed", async () => {
      const res = await request(app).get(`/todos/-1`);
      expect(res.status).to.equal(404);
    });
  });

  describe("POST /", () => {
    it("should return created todo when the all request body is valid", async () => {
      const res = await request(app)
        .post("/todos")
        .send({
          title: "Integration testing",
          completed: false
        });

      const data = res.body;

      expect(res.status).to.equal(201);
      expect(data).to.have.property("title");
      expect(data).to.have.property("completed");
    });
  });

  describe("PUT /:id", async () => {
    const todo = todoFixtures[todoFixtures.length - 1];

    it("should fail to update an invalid todo with a 404 not found", async () => {
      todo.title = "Integration testing, second update";

      let res = await request(app)
        .put(`/todos/-1`)
        .send(todo);

      expect(res.status).to.equal(404);
    });

    it("should update requested id and return response 200", async () => {
      todo.title = "Integration testing, second update";

      let res = await request(app)
        .put(`/todos/${todo.id}`)
        .send(todo);

      expect(res.status).to.equal(202);
      expect(res.body).to.have.property("title", todo.title);
    });

    it("should return updated values when todo is requested", async () => {
      todo.title = "Integration testing, second update";

      let res = await request(app).get(`/todos/${todo.id}`);

      expect(res.status).to.be.equal(200);
      expect(res.body).to.have.property("title", todo.title);
    });
  });

  describe("DELETE /:id", () => {
    const todo = todoFixtures[todoFixtures.length - 1];

    it("should fail to delete an invalid todo with a 404 not found", async () => {
      todo.title = "Integration testing, second update";

      let res = await request(app)
        .delete(`/todos/-1`)
        .send(todo);

      expect(res.status).to.equal(404);
    });

    it("should delete requested id and return response 200", async () => {
      let result = await request(app)
        .delete(`/todos/${todo.id}`);

      expect(result.status).to.equal(204);
    });

    it("should return 404 when deleted user is requested", async () => {
      let res = await request(app).get(`/todos/${todo.id}`);

      expect(res.status).to.be.equal(404);
    });
  });
});