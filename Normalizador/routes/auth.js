const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config');

exports.login = (req, res) => {
    User.findOne({
        'username': req.body.username
    }, (err, user) => {
        if (err) throw err;
        if (!user) {
            res.status(403).send({
                success: false,
                message: 'Falha na autenticação!',
            });
        } else {
            if (user.password !== req.body.password) {
                res.status(403).send({
                    success: false,
                    message: 'Falha na autenticação!',
                });
            } else {
                res.status(201).send({
                    success: true,
                    message: 'Usuário autenticado com sucesso!',
                    id_token: jwt.sign(user.toJSON(), config.secret, {
                        expiresIn: 86400
                    })
                })
            }
        }
    })
};

exports.checkAuth = (req, res, next) => {
    const token = req.body.token || req.param('token') || req.headers['token'];
    if (token) {
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                return res.json({ success: false, message: 'Falha ao autenticar a token!' });
            } else {
                req.decoded = decoded;
                next();
            }
        })
    } else {
        return res.status(403).send({
            success: false,
            message: 'Nenhuma token foi enviada!'
        })
    }
};

exports.checkToken = (req, res, next) => {
    const token = req.body.token || req.param('token') || req.headers['token'];
    if (token) {
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                return res.status(200).send({success: false});
            } else {
                return res.status(200).send({success: true});
            }
        })
    } else {
        return res.status(200).send({
            success: false
        })
    }
};
