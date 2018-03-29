const mongoose = require('mongoose');

UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    corretora: String,
});

module.exports = mongoose.model('User', UserSchema);
