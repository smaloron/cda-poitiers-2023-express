// Import du module dotenv
const dotenv = require('dotenv');
// chargement des variables du fichier .env dans process.env
dotenv.config();

// Import du module express
const { response } = require('express');
const express = require('express');

// Création de l'application
const app = express();

// Définition d'une route
app.get('/hello/:name', function (request, response) {
    response.json({ message: `hello ${request.params.name}` });
});

app.get('/addition/:n1([0-9]+)/:n2([0-9]+)', function (req, res) {
    res.json({
        resultat: parseInt(req.params.n1) + parseInt(req.params.n2)
    });
});


// lancement du serveur
app.listen(process.env.EXPRESS_PORT, () => console.log('serveur en cours'));