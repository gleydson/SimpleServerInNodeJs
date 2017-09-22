var User = require('../models/user.js');
var Post = require('../models/post.js');
var bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

module.exports.listUsers = function(req, res) {
    let promisse = User.find().exec();
    promisse.then(
        function(user) {
            res.json(user);
        },
        function(erro) {
            res.status(500).end();
        }
    );
}

module.exports.getUser = function(req, res) {
    let promisse = User.findById(req.params.id).exec()
    promisse.then(
        function(user) {
            res.json(user);
        },
        function(erro) {
            res.status(404).end();
        }
    );
}

module.exports.insertUser = function(req, res) {
    let u = new User({
        name    :   req.body.name,
        email   :   req.body.email,
        password:   bcrypt.hashSync(req.body.password, 10)
    });
    let promisse = User.create(u)
    promisse.then(
        function(user) {
            res.status(201).json(user);
        },
        function(erro) {
            res.status(500).json(erro);
        }
    );
}

module.exports.removeUser = function(req, res) {
    let idUser = jwt.decode(req.query.token)._doc._id;
    let id = req.params.id;
    let promisse = User.findOneAndRemove({$and:[{_id:id},{_id:idUser}]}).exec()
    promisse.then(
        function(user) {
            if(!user){
                res.status(500).send("Operação não permitida!");
            }else{
                res.json(user);
            }
        },
        function(erro) {
            res.status(500).end();
        });
}

module.exports.updateUser = function(req, res) {
    let set = {$set:{name:req.body.name, email:req.body.email, password:bcrypt.hashSync(req.body.password, 10)}};
    let user2 = jwt.decode(req.query.token)._doc._id;
    let id = req.params.id;
    let promisse = User.findOneAndUpdate({$and:[{_id:id},{_id:user2}]}, set).exec()
    promisse.then(
        function(user) {
            res.status(200).json(user);
        },
        function(erro) {
            res.status(500).end();
        });
}

module.exports.getPostOfUser = function(req, res) {
    let promisse = Post.find({"uid":req.params.id}).exec()
    promisse.then (
        function(post) {
            res.json(post);
        },
        function(erro) {
            res.status(500).end();
        }
    );   
}
