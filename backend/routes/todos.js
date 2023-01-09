const express = require("express");
const router = express.Router();
const db = require("../models");

const Todo = db.todos;

router.get("/", (req, res) => {
  Todo.findAll().then((todos) => {
    res.status(200).send(todos);
  });
});

router.get("/:id", (req, res) => {
  Todo.findByPk(req.params.id)
    .then(todo => {
      if (todo) {
        res.status(200).send(todo);
      } else {
        res.status(404).send({ message: "Not found" });
      }
    })
    .catch(err => {
      res.status(500).send({ message: `Error retrieving todos: ${err.message}` });
    });
});

router.post("/", (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Title can not be empty!",
    });

    return;
  }

  const todo = {
    title: req.body.title,
    completed: req.body.completed || 0,
  };

  Todo.create(todo)
    .then(todo => {
      res.status(201).send(todo);
    })
    .catch(err => {
      res.status(500).send({
        message: `Error while creating a todo: ${err.message}`,
      });
    });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;

  Todo.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {      
        Todo.findByPk(id).then(todo => {
          res.status(202).send(todo);
        })
      } else {
        res.status(404).send({
          message: `Cannot update todo with id ${id}`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Error updating todo with id ${id}: ${err.message}`,
      });
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  Todo.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.status(204).send({
          message: "Todo was deleted successfully.",
        });
      } else {
        res.status(404).send({
          message: `Cannot delete todo with id ${id}`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Error deleting todo with id ${id}: ${err.message}`,
      });
    });
});

module.exports = router;