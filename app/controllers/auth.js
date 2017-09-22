let bcrypt = require('bcrypt');
let user = require('../models/user.js');
let jwt = require('jsonwebtoken');

module.exports.checar = function(req, res, next){
    if(!req.query.token){
        res.status(400).send("Nao tem token");
    }
    jwt.verify(req.query.token, 'secret', 
    function(err, decoded){
        if(err){
            res.status(401).send('Token invalido')
        }
        next();
    })
}

module.exports.logar = function(req, res) {
    function logar(u) {
        if(!u)
            falhar();
        if(!bcrypt.compareSync(req.body.password, u.password)) {
            falhar();
        } else {
            let token = jwt.sign(u, "secret");
            res.status(200).json({
                message : "Logado",
                token   : token,
                userId  : u._id
            });
        }
    }
    function falhar() {
        res.status(401).send("Login Inválido");
    }
    user.findOne({
        email : req.body.email
    }).exec().then(logar, falhar);
}
