const mongoose = require('mongoose');
const crypto = require('crypto');


const getHash = (value) => {
    const sha1 = crypto.createHash('sha1');
    sha1.update(value);
    return sha1.digest('hex')
}

const UserSchema = mongoose.Schema({
    login: { type: String, required: true },
    userName: { type: String, required: true },
    userPassword: {
        type: String,
        required: true,
        set: value => getHash(value)
    }
});

module.exports = {
    schema: UserSchema,
    model: new mongoose.model('users', UserSchema),
    getHash
}