const express = require('express');
const authMiddleware = require('../middlewares/auth');
const User = require('../models/User');

const router = express.Router();

router.use(authMiddleware);

router.get('/', async(req, res) => {
  try{
    const users = await User.find();

    return res.status(200).send({ users });
  }catch(err){
    return res.status(404).send({ erro: 'Erro ao encontrar usuários!' });
  }
});

module.exports = app => app.use('/users', router);