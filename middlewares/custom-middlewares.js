
const dateMiddleware = (req, res, next) => {
    req.now = new Date().toLocaleDateString();
    next();
};

function apiMiddleware (req, res, next) {
    if (req.query.KEY && req.query.KEY === '123') {
        next();
    } else {
        res.status(403).json({ message: 'Non autorisé' });
    }
}

module.exports = {
    date: dateMiddleware,
    api: apiMiddleware
};