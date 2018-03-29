const router = require('express').Router();

router.get('/teste', (req, res) =>{ console.log('api funcionando')});

router.use('/upload', require('./upload'));
router.use('/log', require('./log'));

module.exports = router;
