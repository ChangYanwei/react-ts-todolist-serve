const express = require("express");
const fs = require("fs");

const router = express.Router();

const getData = () => {
  const data = fs.readFileSync("./data.json", "utf-8");
  return JSON.parse(data).todoList;
};

const setData = todoList => {
  fs.writeFileSync("./data.json", JSON.stringify({ todoList }));
};

router.get("/list", (req, res) => {
  res.send({
    code: 200,
    data: getData(),
  });
});

router.post("/add", (req, res) => {
  console.log(req.body);
  const todoList = getData();
  todoList.push(req.body);
  setData(todoList);
  res.send({
    code: 200,
  });
});

router.post("/delete", (req, res) => {
  const id = req.body.id;
  const todoList = getData().filter(todo => todo.id !== id);
  setData(todoList);
  res.send({
    code: 200,
  });
});

router.post("/toggle", (req, res) => {
  const id = req.body.id;
  const todoList = getData().map(todo => {
    if (todo.id === id) {
      todo.done = !todo.done;
    }
    return todo;
  });
  setData(todoList);
  res.send({
    code: 200,
  });
});

router.post("/update", (req, res) => {
  const { id, content } = req.body;
  const todoList = getData().map(todo => {
    if (todo.id === id) {
      todo.content = content;
    }
    return todo;
  });
  setData(todoList);
  res.send({
    code: 200,
  });
});

module.exports = router;
