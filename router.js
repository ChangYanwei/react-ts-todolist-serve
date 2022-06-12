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

router.get("/listAll", (req, res) => {
  res.send({
    code: 200,
    data: getData(),
  });
});

router.post("/list", (req, res) => {
  let { page = 1, size = 5, status } = req.body;
  console.log(req.body);

  const allTodoList = getData();
  const activeTodoList = allTodoList.filter(todo => !todo.done);
  const completedTodoList = allTodoList.filter(todo => todo.done);

  let todoList = allTodoList;
  let total = allTodoList.length;
  switch (status) {
    case "active":
      todoList = activeTodoList;
      total = activeTodoList.length;
      break;
    case "completed":
      todoList = completedTodoList;
      total = completedTodoList.length;
      break;
  }
  let result = [];
  while (page > 0) {
    result = todoList.slice((page - 1) * size, page * size);
    if (result.length > 0 || page === 1) {
      break;
    } else {
      page--;
    }
  }
  res.send({
    code: 200,
    total,
    activeNum: activeTodoList.length,
    completedNum: completedTodoList.length,
    page,
    size,
    data: result,
  });
});

router.post("/add", (req, res) => {
  console.log(req.body);
  const todoList = getData();
  todoList.unshift(req.body);
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
