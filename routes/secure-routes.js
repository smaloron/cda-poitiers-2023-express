const express = require('express');
const router = express.Router();

const security = require('../middlewares/jwt-check');

// Middleware pour sécuriser les routes 
// et rendre obligatoire la présence d'un token
// qui plus est valide
router.use(security.checkToken);

router.get('/', (req, res) => {
    res.status(200).json({
        data: req.tokenData
    });
});

module.exports = router;