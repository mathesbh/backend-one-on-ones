const express = require('express');
const authMiddleware = require('../middlewares/auth');
const Meeting = require('../models/Meeting');

const router = express.Router();

router.use(authMiddleware);

router.get('/', async(req, res) => {
    try{
        const meetings = await Meeting.find().populate('user');

        return res.status(200).send({ meetings });

    }catch(err){
        return res.status(404).send({ erro: 'Não foi possível listar encontros!' });
    }
});

router.post('/', async (req, res) => {
    try {
        const meeting = await Meeting.create({ ...req.body, user: req.userId });

        return res.status(201).send({ meeting });

    } catch(err){
        return res.status(400).send({ erro: 'Não foi possível criar encontro!' });
    }
});

module.exports = app => app.use('/meetings', router);