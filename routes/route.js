const express = require('express');
const route = express.Router();
const controller = require('../controller/controller.main')

route.post('/adminRegister',controller.adminRegister);
route.post('/adminLogin',controller.adminLogin);
route.post('/userRegister', controller.userRegister);
route.post('/userLogin',controller.userLogin);
route.post('/createTodo',controller.createTodo);
route.put('/editTodo/:id',controller.editTodo);
route.delete('/deleteTodo/:id',controller.deleteTodo);
route.get('/allTodoList',controller.allTodoList);
route.get('/allUser',controller.allUsers);

module.exports = route;
