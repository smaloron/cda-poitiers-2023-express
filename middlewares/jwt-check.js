const jwt = require('jsonwebtoken');

function checkToken (req, res, next) {
    const authorizationHeader = req.headers.authorization || '';
    const token = authorizationHeader.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'token absent' });
    }

    jwt.verify(token, process.env.SECRET, (error, data) => {
        if (error) {
            res.status(401).json({ message: 'Mauvais token' });
        } else {
            req.tokenData = data;
            next();
        }
    });
}

module.exports = {
    checkToken
};