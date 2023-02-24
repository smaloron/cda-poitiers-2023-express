const mongoose = require('mongoose');

const BookSchema = mongoose.Schema({
    title: String,
    author: String,
    price: Number
});

module.exports = {
    schema: BookSchema,
    model: mongoose.model('books', BookSchema)
}