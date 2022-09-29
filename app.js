const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRoute = require('./routes/route')

console.log('Hello ToDo!!');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api', userRoute)

mongoose.connect('mongodb://localhost:27017/users')
.then(()=>{console.log('connected to database successfully');})
.catch((err)=>{console.log('could not connect to database'),err});

app.listen(3000,()=>{console.log('app is running on port 3000...')});