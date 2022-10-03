const jwt = require('jsonwebtoken');

function a(req, res, next) {
    try {
        let token = req.header('x-auth-token');
        if (!token) return res.status(400).json({ messege: 'token invalid...' });

        let decoded = jwt.verify(token, 'jwtSecretKey');
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ messege: 'token invalid...', err });
    };
};


module.exports = { a }; 