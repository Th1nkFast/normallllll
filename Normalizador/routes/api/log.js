const router = require('express').Router();
const Uploaded = require('../../models/Uploaded');

router.get('/completo/:dataInicio/:dataFim', (req, res) => {
    const start = new Date(req.params.dataInicio);
    start.setHours(0,0,0,0);
    const end = new Date(req.params.dataFim);
    end.setHours(23,59,59,999);
    Uploaded.find({"timestamp": {"$gte": start.toISOString(), "$lt": end.toISOString()}}, null, {sort: '-date'}, (err, files) => {
        res.json(files);
    });
});

router.get('/diario', (req, res) => {
    const start = new Date();
    start.setHours(0,0,0,0);

    const end = new Date();
    end.setHours(23,59,59,999);

    Uploaded.find({"timestamp": {"$gte": start.toISOString(), "$lt": end.toISOString()}}, null, {sort: '-date'}, (err, files) => {
        res.json(files);
    });
});

module.exports = router;
