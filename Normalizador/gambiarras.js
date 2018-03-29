const mongoose = require('mongoose');
const config = require('./config');
const Arquivo = require('./models/Arquivo');
const Corretora = require('./models/Corretora');
const User = require('./models/User');


mongoose.connect(config.database);

const run = ( ) => {

    const user1 = new User({
        username: 'ian',
        password: '210697',
        corretora: 'refere',
    });

    user1.save((err) => {
        console.log('foi');
        if (err) throw err;
    });

    const cor1 = new Corretora({
        nome: 'refere',
        pasta: 'C000_Refere',
        arquivos: ['map_com','map_emi','por_emi'],
    });

    cor1.save((err) => {
        console.log('foi');
        if (err) throw err;
    });

    const arq1 = new Arquivo({
        nome: 'map_com',
        seguradora: 'Mapfre',
        tipo: 'comissoes',
        regex: ''
    });

    arq1.save((err) => {
        console.log('foi');
        if (err) throw err
    });

    const arq2 = new Arquivo({
        nome: 'map_emi',
        seguradora: 'Mapfre',
        tipo: 'emissoes',
        regex: ''
    });

    arq2.save((err) => {
        console.log('foi');
        if (err) throw err
    });

    const arq3 = new Arquivo({
        nome: 'por_emi',
        seguradora: 'porto seguro',
        tipo: 'emissoes',
        regex: ''
    });

    arq3.save((err) => {
        console.log('foi');
        if (err) throw err
    });
};

run();
