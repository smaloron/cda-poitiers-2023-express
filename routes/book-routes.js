const router = require('express').Router();
const Book = require('../models/book-model');

// Insertion de données
router.post('/', async (req, res) => {
    const book = new Book.model(req.body);
    await book.save();
    res.json({ newBook: book });
});

// Affichage de toutes les données
router.get('/', async (req, res) => {
    const data = await Book.model.find();
    res.json({ booklist: data });
});

// Affichage d'un livre
router.get('/:id', async (req, res) => {
    const data = await Book.model.findById(req.params.id);
    res.json({ book: data });
});

// Modification d'un livre
router.put('/:id', async (req, res) => {
    const data = await Book.model.updateOne(
        { _id: req.params.id },
        req.body
    );
    res.json({ book: data });
});


module.exports = router;