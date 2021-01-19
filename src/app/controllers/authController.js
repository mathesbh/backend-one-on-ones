const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.post('/cadastro', async (req, res) => {
    const { email } = req.body
    try{
        if(await User.findOne({ email }))
            return res.status(400).send({ erro: 'Email de usuário já cadastrado' });

        const user = await User.create(req.body);

        user.password = undefined;

        return res.status(201).send({ user });
    } catch(err){
        return res.status(400).send({ erro: 'Cadastro falhou'});
    }
});

module.exports = app => app.use('/auth', router);