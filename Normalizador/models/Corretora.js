const mongoose = require('mongoose');

UserSchema = new mongoose.Schema({
    nome: String,
    pasta: String,
    arquivos: [String],
});

module.exports = mongoose.model('Corretora', UserSchema);
