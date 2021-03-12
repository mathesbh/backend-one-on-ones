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
        return res.status(400).send({ erro: 'Erro na listagem dos encontros'});
    }
});

router.post('/', async (req, res) => {
    try {
        const meeting = await Meeting.create({ ...req.body, user: req.userId });

        return res.status(201).send({ meeting });

    } catch(err){
        console.log(err)
        return res.status(400).send({ erro: 'Erro na criação de um novo encontro'});
    }
});

module.exports = app => app.use('/encontros', router);