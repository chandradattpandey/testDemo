const express = require('express');
const route = express.Router();
const controller = require('../controller/controller.main');
const auth = require('../middleware/auth');

route.post('/adminRegister',controller.adminRegister);
route.post('/adminLogin',controller.adminLogin);
route.post('/userRegister', controller.userRegister);
route.post('/userLogin',controller.userLogin);
route.post('/createTodo',auth.a,controller.createTodo);
route.put('/editTodo/:id',auth.a,controller.editTodo);
route.delete('/deleteTodo/:id',auth.a,controller.deleteTodo);
route.get('/allTodoList',auth.a,controller.allTodoList);
route.get('/allUser',auth.a,controller.allUsers);
route.get('/searchTodo/:key',auth.a,controller.searchTodo);

module.exports = route;
