const express = require('express');
// Création du routeur avec express
const router = express.Router();

// Import des contrôleurs
const defaulControlers = require('../controllers/default-controllers');

// Définition d'une route
router.get('/hello/:name', defaulControlers.hello);

router.get('/addition/:n1([0-9]+)/:n2([0-9]+)', defaulControlers.add);
/**
 * test de la réception de données postées
 */
router.post('/test', defaulControlers.test);

module.exports = router;