const Schema = require('../models/model');
const todoSchema = require('../models/todoSchema')

async function userRegister(req, res) {
    try {
        let user = new Schema({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: 'user',
            registration_date: new Date()
        });
        let userMail = await Schema.findOne({ 'email': req.body.email });
        if (userMail) {
            res.status(400).json({success: false, messege: 'user already registered' })
        } else {
            let result = await user.save();
            if (!result) {
                res.status(400).json({ success: false, messege: 'user not register' });
            } else {
                console.log(result, 'line17');
                res.status(200).json({ success: true, messege: 'user register', result });
            };
        };
    } catch (err) {
        res.status(400).json({ success: false, messege: 'error', err });
    };
};


async function userLogin(req, res) {
    try {
        let userId = req.params.id;
        let userPsw = req.body.password;
        let data = await Schema.findById({ '_id': userId });
        if (!data) {
            res.status(400).json({ success: false, messege: 'user not registered' });
        } else {
            data.comparePassword(userPsw, function (err, isMatch) {
                if (err) {
                    res.status(400).json({ success: false, error: 'user not registered', err });
                } else if (!isMatch) {
                    res.status(400).json({ success: false, error: 'password not match' });
                } else {
                    res.status(200).json({ success: true, messege: 'user login', data });
                }
            });
        };
    } catch (err) {
        res.status(400).json({ success: false, error: err });
    };
};


async function createTodo(req, res) {
    try {
        let toDo = new todoSchema({
            heading: req.body.heading,
            description: req.body.description,
            status: req.body.status,
            creation_date: new Date()
        });
        let data = await toDo.save();
        if (!data) {
            res.status(400).json({ success: false, error: 'todo not create' });
        } else {
            res.status(200).json({ success: true, messege: 'todo created', data });
        };
    } catch (err) {
        res.status(400).json({ success: false, error: 'error', err })
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
            res.status(400).json({ success: false, error: 'Todo not found' });
        } else {
            res.status(200).json({ success: true, messege: 'Todo update successfully', result });
        };
    } catch (err) {
        res.status(400).json({ success: false, error: 'Todo not found', err });
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
        res.status(400).json({ success: false, error: 'user not found', err });
    };
};

module.exports = { userRegister, userLogin, createTodo, editTodo, deleteTodo };