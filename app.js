// Import du module dotenv
const dotenv = require('dotenv');
// chargement des variables du fichier .env dans process.env
dotenv.config();

// Import du module express
const { response } = require('express');
const express = require('express');

// Import des midddlewares perso
const customMiddlewares = require('./middlewares/custom-middlewares');

// Import des contrôleurs
const defaulControlers = require('./controllers/default-controllers');

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
app.get('/hello/:name', defaulControlers.hello);

app.get('/addition/:n1([0-9]+)/:n2([0-9]+)', defaulControlers.add);
/**
 * test de la réception de données postées
 */
app.post('/test', defaulControlers.test);

// Dernière route qui capture toute route non encore capturée
app.all('*', defaulControlers.notFound);


// lancement du serveur
app.listen(process.env.EXPRESS_PORT, () => console.log('serveur en cours'));