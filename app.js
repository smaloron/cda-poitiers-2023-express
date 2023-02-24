// Import du module dotenv
const dotenv = require('dotenv');
// chargement des variables du fichier .env dans process.env
dotenv.config();

// Import de mongoose
const mongoose = require('mongoose');

// Import de jsonwebtoken
const jwt = require('jsonwebtoken');

// Import du module express
const express = require('express');

// Import des midddlewares perso
const customMiddlewares = require('./middlewares/custom-middlewares');

// Création de l'application
const app = express();

// Import du module morgan pour loguer les requêtes
// et utilisation de ce module dans un middleware
app.use(require('morgan')('tiny'));

// Import des contrôleurs
const defaultControlers = require('./controllers/default-controllers');

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

// Route externe
app.use(require('./routes/default-routes'));
app.use('/secure', require('./routes/secure-routes'));

// Dernière route qui capture toute route non encore capturée
app.all('*', defaultControlers.notFound);


// lancement du serveur
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URL,
    {
        useNewUrlParser: true,
        dbName: 'express'
    }
)
    .then(() => {
        app.listen(process.env.EXPRESS_PORT, () => console.log('serveur en cours'));
    })
    .catch((err) => console.log(err));
