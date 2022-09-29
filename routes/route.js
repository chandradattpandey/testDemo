const express = require('express');
const route = express.Router();
const controller = require('../controller/controller.main')

route.post('/userRegister', controller.userRegister);
route.post('/userLogin/:id',controller.userLogin);
route.post('/createTodo',controller.createTodo);
route.put('/editTodo/:id',controller.editTodo);
route.delete('/deleteTodo/:id',controller.deleteTodo);

module.exports = route;
