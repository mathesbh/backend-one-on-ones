const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const router = express.Router();

function genereteToken(params = {}){
    return jwt.sign(params, process.env.SECRET_AUTH, { expiresIn: 86400 });
}   

router.post('/cadastro', async (req, res) => {
    const { email } = req.body
    try{
        if(await User.findOne({ email }))
            return res.status(400).send({ erro: 'Email de usuário já cadastrado' });

        const user = await User.create(req.body);

        user.password = undefined;

        return res.status(201).send({ user, token: genereteToken({ id: user.id }) });
    } catch(err){
        return res.status(400).send({ erro: 'Cadastro falhou'});
    }
});

router.post('/autenticacao', async (req, res) => {
    const { email, password } = req.body;

    try{
        const user = await User.findOne({ email }).select('+password');

        if(!user)
            return res.status(400).send({ erro: 'Usuário não encontrado'});
        
        if(!await bcrypt.compare(password, user.password))
            return res.status(400).send({ erro: 'Senha inválida' });

        user.password = undefined;

        res.status(200).send({ user, token: genereteToken({ id: user.id }) });

    }catch(err){
        console.log(err)
        return res.status(400).send({ erro: 'Falha com a autenticação' });
    }
});

module.exports = app => app.use('/auth', router);