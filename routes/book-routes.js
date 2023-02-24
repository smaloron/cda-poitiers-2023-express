const router = require('express').Router();
const Book = require('../models/book-model');

router.post('/', async (req, res) => {
    const book = new Book.model(req.body);
    await book.save();
    res.json({ newBook: book });
});


module.exports = router;