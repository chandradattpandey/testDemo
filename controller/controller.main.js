const Schema = require('../models/model');
const todoSchema = require('../models/todoSchema');
const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');

async function userRegister(req, res) {
    try {
        let user = new Schema({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: 'user',
            registration_date: new Date(),
            profile: {
                data: fs.readFileSync(path.join(__dirname + "/../uploads/" + req.file.filename)),
                contentType: 'image/*'
            }
        })
        let userMail = await Schema.findOne({ 'email': req.body.email });
        if (userMail) {
            res.status(400).json({ success: false, messege: 'user already registered' })
        } else {
            let result = await user.save();
            if (!result) {
                res.status(400).json({ success: false, messege: 'user not register1' });
            } else {
                res.status(200).json({ success: true, messege: 'user register', result });
            };
        };
    } catch (err) {
        res.status(400).json({ success: false, messege: 'user not register2', err });
    };
};


async function userLogin(req, res) {
    try {
        let userMail = req.body.email;
        let userPsw = req.body.password;
        let data = await Schema.findOne({ 'email': userMail });
        if (!data) {
            res.status(400).json({ success: false, messege: 'user not registered' });
        } else {
            let role = data.role;
            if (role == 'user') {
                data.comparePassword(userPsw, function (err, isMatch) {
                    if (err) {
                        res.status(400).json({ success: false, messege: 'user not registered', err });
                    } else {
                        if (!isMatch) {
                            res.status(400).json({ success: false, messege: 'password not match' });
                        } else {
                            let token = data.generateToken();
                            res.cookie('token', token);
                            res.header('x-auth-token', token).status(200).json({ success: true, messege: 'user login', data, token });
                        };
                    };
                });
            } else {
                res.status(400).json({ messege: 'only users are allowed' });
            };
        };
    } catch (err) {
        res.status(400).json({ success: false, messege: 'user not found', err });
    };
};


async function createTodo(req, res) {
    try {
        let toDo = new todoSchema({
            heading: req.body.heading,
            description: req.body.description,
            status: req.body.status,
            creation_date: new Date(),
            image: {
                data: fs.readFileSync(path.join(__dirname + "/../uploads/" + req.file.filename)),
                contentType: 'image/*'
            }
        });
        let data = await toDo.save();
        if (!data) {
            res.status(400).json({ success: false, messege: 'todo not create' });
        } else {
            res.status(200).json({ success: true, messege: 'todo created', data });
        };
    } catch (err) {
        res.status(400).json({ success: false, messege: 'error', err })
    };
};


async function editTodo(req, res) {
    try {
        let id = req.params.id;
        let heading = req.body.heading;
        let description = req.body.description;
        let status = req.body.status;
        let result = await todoSchema.findByIdAndUpdate({ '_id': id },
            { $set: { 'heading': heading, 'description': description, 'status': status } },
            { new: true });
        if (!result) {
            res.status(400).json({ success: false, messege: 'Todo not found' });
        } else {
            res.status(200).json({ success: true, messege: 'Todo update successfully', result });
        };
    } catch (err) {
        res.status(400).json({ success: false, messege: 'Todo not found', err });
    };
};

async function deleteTodo(req, res) {
    try {
        let id = req.params.id;
        let result = await todoSchema.findByIdAndDelete({ '_id': id });
        if (!result) {
            res.status(400).json({ success: false, error: 'user not found' });
        } else {
            res.status(200).json({ success: true, messege: 'task deleted', result });
        };
    } catch (err) {
        res.status(400).json({ success: false, messege: 'user not found', err });
    };
};

async function adminRegister(req, res) {
    try {
        let admin = new Schema({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: 'admin',
            registration_date: new Date(),
            profile: {
                data: fs.readFileSync(path.join(__dirname + "/../uploads/" + req.file.filename)),
                contentType: 'image/*'
            }
        });
        let adminMail = await Schema.findOne({ 'email': req.body.email });
        if (adminMail) {
            res.status(400).json({ success: false, messege: 'admin already registered' });
        } else {
            let data = await admin.save();
            if (!data) {
                res.status(400).json({ success: false, messege: 'admin not register' });
            } else {
                res.status(200).json({ messege: 'admin register' });
            }
        };
    } catch (err) {
        res.status(400).json({ success: false, messege: 'admin not register', err });
    };
};

async function adminLogin(req, res) {
    try {
        let email = req.body.email;
        let password = req.body.password;
        let data = await Schema.findOne({ email: email });
        if (!data) {
            res.status(400).json({ success: false, messege: 'admin not found' });
        } else {
            let role = data.role;
            if (role == 'admin') {
                data.comparePassword(password, function (err, isMatch) {
                    if (err) {
                        res.status(400).json({ success: false, messege: 'admin not exist', err });
                    } else {
                        if (!isMatch) {
                            res.status(400).json({ success: false, messege: 'password not match' });
                        } else {
                            res.status(200).json({ success: true, messege: 'admin logged in' });
                        };
                    }
                });
            } else {
                res.status(400).json({ success: false, messege: 'only admin are allowed' });
            };
        };
    } catch (err) {
        res.status(400).json({ success: false, messege: 'admin not found', err });
    };
};


async function allTodoList(req, res) {
    try {
        let list = await todoSchema.find({});
        if (!list) {
            res.status(400).json({ success: false, messege: 'list not found' });
        } else {
            res.status(200).json({ success: true, messege: 'todo list', list });
        };
    } catch (err) {
        res.status(400).json({ success: false, messege: 'todo list not found', err });
    };
};

async function todoDetails(req, res) {
    try {
        let id = req.params.id;
        let details = await todoSchema.find({ '_id': id });
        if (!details) {
            res.status(400).json({ success: false, messege: 'details not found' });
        } else {
            res.status(200).json({ success: true, messege: 'details list', details });
        };
    } catch (err) {
        res.status(400).json({ success: false, messege: 'details list not found', err });
    };
};


async function allUsers(req, res) {
    try {
        let users = await Schema.find({});
        if (!users) {
            res.status(400).json({ success: false, messege: 'users are not found' });
        } else {
            res.status(200).json({ success: true, messege: 'users list', users });
        };
    } catch (err) {
        res.status(400).json({ success: false, messege: 'users list not found', err });
    };
};

async function logout(req, res) {
    try {

    } catch (err) {
        res.status(400).json({ success: false, messege: 'error', err });
    };
}


async function searchTodo(req, res) {
    try {
        let key = req.params.key;
        // let getStatus = await todoSchema.find({ status: { $regex: key } });
        // if (!getStatus) return res.status(400).json({ messege: 'error' });

        // res.status(200).json({success: true, messege: 'todo list...', getStatus });


        let data = await todoSchema.find({
            $or: [
                { status: { $regex: key } },
                { heading: { $regex: key } },
                // { creation_date: { $in: key } }
            ]
        });
        if (!data) {
            res.status(400).json({ success: false, messege: 'error' });
        } else {
            res.status(200).json({ success: true, messege: 'todo list...', data });
        };
    } catch (err) {
        res.status(400).json({ success: false, messege: 'error', err });
    };
};


const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const fileName = 'contacts.csv';

async function awsS3(req, res) {
    try {
        fs.readFile(fileName, (err, data) => {
            if (err) throw err;
            const params = {
                Bucket: 'testBucket', 
                Key: `${fileName}`, 
                Body: JSON.stringify(data, null, 2)
            };
            s3.upload(params, function (s3Err, data) {
                if (s3Err) throw s3Err
                console.log(`File uploaded successfully at ${data.Location}`)
            });
        });
    } catch (err) {
        res.status(400).json({ success: false, messege: err.messege })
    };
};


async function getData(req, res){
    try{
       let data = await Schema.find({});
       if(!data){
        res.status(400).json({success:false, messege:"data not found"});
       }else{
        res.status(200).json({success:true,messege:"data list",data});
       };
    }catch(err){
        res.status(400).json({success:false,messege:"data not found"});
    };
};



module.exports = {
    adminRegister, adminLogin, userRegister, userLogin, createTodo,
    editTodo, deleteTodo, allTodoList, todoDetails, allUsers, logout, searchTodo, awsS3, getData
};
