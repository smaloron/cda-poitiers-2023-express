// Import du module dotenv
const dotenv = require('dotenv');
// chargement des variables du fichier .env dans process.env
dotenv.config();

// Import du module express
const { response } = require('express');
const express = require('express');

// Import des midddlewares perso
const customMiddlewares = require('./middlewares/custom-middlewares');

// Création de l'application
const app = express();

// Import du module morgan pour loguer les requêtes
// et utilisation de ce module dans un middleware
app.use(require('morgan')('tiny'));

// Gestion des ressources statiques
app.use('/img', express.static('images'));

// Middleware perso
app.use(customMiddlewares.date);

// Sécurisation des routes /test avec un clef d'API
app.use('/test*', customMiddlewares.api);

// Gestion des données postées dans la requête HTTP
// Récupération depuis un appel ajax (ex: axios)
app.use(express.json());
// Récupération depuis formulaire web ou Postman
app.use(express.urlencoded({ extended: true }));

// Définition d'une route
app.get('/hello/:name', function (request, response) {
    response.json({
        message: `hello ${request.params.name}`,
        date: request.now
    });
});

app.get('/addition/:n1([0-9]+)/:n2([0-9]+)', function (req, res) {
    res.json({
        resultat: parseInt(req.params.n1) + parseInt(req.params.n2),
        date: req.now
    });
});
/**
 * test de la réception de données postées
 */
app.post('/test', (req, res) => {
    res.json({
        data: req.body
    });
});

// Dernière route qui capture toute route non encore capturée
app.all('*', (req, res) => {
    res.status(404).json({ message: 'ressource introuvable' });
});


// lancement du serveur
app.listen(process.env.EXPRESS_PORT, () => console.log('serveur en cours'));