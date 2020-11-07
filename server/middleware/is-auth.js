const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    // console.log(authHeader);
    if (!authHeader) {
        const error = new Error('Not authenticated.');
        error.statusCode = 401;
        throw error;
    }
    const token = authHeader.split(' ')[1];
    let decodedToken = null;

    try {
        decodedToken = jwt.verify(token, process.env.PRIVATE_KEY);
    } catch(err) {
        err.statusCode = 401;
        err.message = 'Not authenticated';
        throw err;
    }
    
    if (!decodedToken) {
        const error = new Error('Not authenticated.');
        error.statusCode = 401;
        throw error;
    }
    req.userId = decodedToken.userId;
    next();
};