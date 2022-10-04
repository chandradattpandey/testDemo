const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRoute = require('./routes/route');
const bodyParser = require('body-parser');

console.log('Hello ToDo!!');
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api', userRoute)

mongoose.connect('mongodb://localhost:27017/users')
.then(()=>{console.log('connected to database successfully');})
.catch((err)=>{console.log('could not connect to database'),err});

const port = process.env.PORT || 3000 ;
app.listen(port,()=>{console.log(`app is running on port ${port}`)});