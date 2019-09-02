const express = require('express');
const router = express.Router();
const Subscriber = require('../models/subscriber');

//GET all subscribers
router.get('/', async (req, res) => {
    try {
        let subs = await Subscriber.find();
        res.json(subs);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

//GET a Subscriber by id
router.get('/:id', getSub , (req, res) => {
    res.json(res.sub);
});

//POST all subscribers
router.post('/', async (req, res) => {
    let sub = new Subscriber({
        name: req.body.name,
        subscribedChannel: req.body.subscribedChannel
    });

    try {
        let newSub = await sub.save();
        res.status(201).json(newSub);
    } catch (e) {
        res.status(400).json({message: e.message});
    }
});

//PUT all subscribers
router.put('/:id', (req, res) => {

});

//DELETE all subscribers
router.delete('/:id', getSub, async (req, res) => {
    try {
        await res.sub.remove();
        res.json({message: "Removido do Mongo"});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
});

async function getSub(req, res, next) {
    try {
        sub = await Subscriber.findById(req.params.id);
        if (sub === null) return res.status(404).json({message: 'Sub não encontrado'});
    } catch (e) {
        return res.status(500).json({message: e.message});
    }

    res.sub = sub;
    next()
}

module.exports = router;