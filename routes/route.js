const express = require('express');
const route = express.Router();
const multer = require('multer');
const controller = require('../controller/controller.main');
const auth = require('../middleware/auth');


var Storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
      },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
  
var upload = multer({ storage : Storage});

route.post('/adminRegister',upload.single('profile'),controller.adminRegister);
route.post('/adminLogin',controller.adminLogin);
route.post('/userRegister',upload.single('profile'), controller.userRegister);
route.post('/userLogin',controller.userLogin);
route.post('/createTodo',upload.single('image'),controller.createTodo);
route.put('/editTodo/:id',auth.a,controller.editTodo);
route.delete('/deleteTodo/:id',auth.a,controller.deleteTodo);
route.get('/allTodoList',auth.a,controller.allTodoList);
route.get('/todoDetails/:id',auth.a,controller.todoDetails);
route.get('/allUser',auth.a,controller.allUsers);
route.get('/searchTodo/:key',auth.a,controller.searchTodo);

module.exports = route;
