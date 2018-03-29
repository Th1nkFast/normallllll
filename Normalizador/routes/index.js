const router = require('express').Router();
const auth = require('./auth');

router.post('/login', auth.login);
router.post('/check', auth.checkToken);

router.use('/api', auth.checkAuth);
router.use('/api', require('./api'));

module.exports = router;
