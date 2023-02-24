const mongoose = require('mongoose');

const BookSchema = mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    price: { type: Number, default: 5, select: false },
});

module.exports = {
    schema: BookSchema,
    model: mongoose.model('books', BookSchema)
}