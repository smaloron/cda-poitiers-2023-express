function hello (request, response) {
    response.json({
        message: `hello ${request.params.name}`,
        date: request.now
    });
}

function add (req, res) {
    res.json({
        resultat: parseInt(req.params.n1) + parseInt(req.params.n2),
        date: req.now
    });
}

const test = (req, res) => {
    res.json({
        data: req.body
    });
}

const notFound = (req, res) => {
    res.status(404).json({ message: 'ressource introuvable' });
}

module.exports = {
    hello,
    add,
    test,
    notFound
}