const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//app.use(morgan('dev'));
app.use(cors());

mongoose.connect(config.database);
require('./Processador');

app.use(require('./routes'));
app.use("/public", express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname+'/public/index.html')
});


app.listen(config.port, () => {
    console.log('Listening on port ' + config.port);
});
