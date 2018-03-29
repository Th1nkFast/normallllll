const mongoose = require('mongoose');

UserSchema = new mongoose.Schema({
    nome: String,
    seguradora: String,
    tipo: String,
    traducao: String
});

module.exports = mongoose.model('Arquivo', UserSchema);
