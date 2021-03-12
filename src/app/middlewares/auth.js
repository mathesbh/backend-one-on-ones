const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader)
        return res.status(401).send({ erro: 'Token não encontrado'});
    
    const parts = authHeader.split(' ');

    if(!parts.length === 2)
        return res.status(401).send({ erro: 'Erro no token' });

    const [ scheme, token ] = parts;

    if(!/^Bearer$/i.test(scheme))
        return res.status(401).send({ erro: 'Formato do token inválido' });

    jwt.verify(token, process.env.SECRET_AUTH, (err, decoded) => {
        if(err) return res.status(401).send({ erro: 'Token inválido' });

        req.userId = decoded.id
        return next();
    });
};