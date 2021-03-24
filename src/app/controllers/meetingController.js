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

router.get('/:meetingId', async(req, res) => {
    try{
        const meeting = await Meeting.findById(req.params.meetingId);
        
        return res.status(200).send({ meeting });

    }catch(err){
        return res.status(404).send({ erro: 'Não foi possível listar encontro!' });
    }
});

router.post('/', async (req, res) => {
    try {
        const meeting = await Meeting.create({ ...req.body, assignedTo: req.userId });

        return res.status(201).send({ meeting });

    } catch(err){
        return res.status(400).send({ erro: 'Não foi possível criar encontro!' });
    }
});

router.put('/:meetingId', async(req, res) => {
    try{
        const meeting = await Meeting.findByIdAndUpdate(req.params.meetingId, req.body, { new: true });
        
        return res.status(200).send({ meeting });
    }catch(err){
        return res.status(404).send({ erro: 'Não foi possível alterar o encontro!' });
    }
});

router.delete('/:meetingId', async(req, res) => {
    try{
        const meeting = await Meeting.findByIdAndDelete(req.params.meetingId);
        
        return meeting === null ? res.status(204).send({ erro: 'Não foi possível deletar o encontro'}) : res.status(200).send({ info: 'Encontro removido com sucesso!' });
        
    }catch(err){
        return res.status(404).send({ erro: 'Não foi possível listar o encontro!' });
    }
});

module.exports = app => app.use('/meetings', router);