const router = require('express').Router();
const formidable = require('formidable');
const path = require('path');
const User = require('../../models/User');
const Corretora = require('../../models/Corretora');
const Uploaded = require('../../models/Uploaded');

router.post('/', (req, res) => {
    User.findOne({
        'username': req.headers['username']
    }, (err, user) => {
        if(err) {
            res.status(500).json({
                uploaded: false,
                error: 'Erro ao tentar realizar conexão com o banco de dados.'
            });
        } else if(!user) {
            res.status(500).json({
                uploaded: false,
                error: 'Usuário inexistente.'
            });
        } else {
            const uploadDir = './';
            const form = new formidable.IncomingForm();
            form.multiples = true;
            form.keepExtensions = true;
            form.uploadDir = uploadDir;
            form.parse(req, (err, fields, files) => {
                if (err) return res.status(500).json({
                    uploaded: false,
                    error: err
                });
                res.status(200).json({uploaded: true});
            });
            form.on('fileBegin', function (name, file) {
                file.path = path.join(uploadDir, file.name);
                validateFile(file.name, user).then((arquivo, err)=>{
                    if(err) console.log(err);
                    const upload = new Uploaded(arquivo);
                    upload.save();
                });
            });
            form.on('file', function(name, file) {
                console.log(file.name)
            });
        }
    });
});

const validateFile = (filename, user) => {
    return new Promise((resolve, reject) => {
        const [cia, tipo, data] = filename.toLowerCase().split('_');
        const obj = {
            cia,
            tipo,
            nome : filename,
            usuario : user.username,
            corretora : user.corretora
        };
        if (!cia || !tipo || !data) {
            obj.valido = false;
            obj.status = 'Erro';
            obj.mensagem = 'Padrão de nome é inválido!';
            resolve(obj);
        } else {
            Corretora.findOne({'nome': user.corretora}, (err, cor) => {
                if (err) reject('Erro ao conectar com o banco de dados!');
                if (!cor) {
                    reject('Corretora inexistente!');
                } else {
                    const valido = cor.arquivos.find(arquivo => arquivo.toLowerCase() === `${cia}_${tipo}`);
                    if (valido) {
                        obj.valido = true;
                        obj.status = 'Aguardando';
                        obj.mensagem = 'Arquivo importado, aguardando processamento!';
                    } else {
                        obj.valido = false;
                        obj.status = 'Erro';
                        obj.mensagem = 'Arquivo não autorizado!';
                    }
                    resolve(obj);
                }
            })
        }
    });
};

module.exports = router;
