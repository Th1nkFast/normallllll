const mongoose = require('mongoose');

UploadedSchema = new mongoose.Schema({
    nome: String,
    cia: String,
    tipo: String,
    valido: Boolean,
    status: String,
    mensagem: String,
    timestamp: { type: Date, default: Date.now },
    usuario: String,
    corretora: String
});

module.exports = mongoose.model('Uploaded', UploadedSchema);
