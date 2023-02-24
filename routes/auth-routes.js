const router = require('express').Router();
const User = require('../models/user-model');

router.post('/register', async (req, res) => {
    const newUser = new User.model({
        login: req.body.login,
        userName: req.body.userName,
        userPassword: req.body.userPass
    });

    await newUser.save();

    res.json({ success: true, user: newUser })
});


router.post('/login', async (req, res) => {
    const hashedPass = User.getHash(req.body.pass);
    const foundUser = await User.model.findOne({
        login: req.body.login,
        userPassword: req.body.pass
    });
    if (foundUser) {
        res.json({ success: true, user: foundUser })
    } else {
        res.status(401).json({ message: 'Echec de l\'authentification' })
    }

});

module.exports = router;

