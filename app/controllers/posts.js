var Post = require('../models/post.js');
let jwt = require('jsonwebtoken');

module.exports.listPosts = function(req, res) {
    let promisse = Post.find().populate("uid").exec();
    promisse.then(
        function(post) {
            res.json(post);
        },
        function(erro) {
            res.status(500).end();
        }
    );
}

module.exports.getPost = function(req, res) {
    let promisse = Post.findById(req.params.id).populate("uid").exec()
    promisse.then(
        function(post) {
            res.json(post);
        },
        function(erro) {
            res.status(404).end();
        }
    );
}

module.exports.insertPost = function(req, res) {
	let id = jwt.decode(req.query.token)._doc._id;
    let post = new Post({
		text : req.body.texto,
		likes : req.body.qtdLikes,
		uid : id
	});
    let promisse = Post.create(post)
    promisse.then(
        function(post) {
            res.status(201).json(user);
        },
        function(erro) {
            res.status(500).json(erro);
        }
    );
}

module.exports.removePost = function(req, res) {
    let id = request.params.id;
  let idU = jwt.decode(request.query.token)._doc._id;
    let promisse = Post.findByIdAndRemove(id).exec()
    promisse.then(
        function(post) {
            res.json(post);
        },
        function(erro) {
            res.status(500).end();
        }
    );        
}

module.exports.updatePost = function(req, res) {
   let idU = jwt.decode(request.query.token)._doc._id;
  let id = request.params.id;

  let post = new Post({
    text : request.body.text,
    qtdLikes : request.body.qtdLikes,
    uid : idU,
    _id : id
  });
  if(post.uid == idU) {
    let promisse = Post.findByIdAndUpdate(req.params.id, req.body).exec()
    promisse.then(
        function(post) {
            res.json(post);
        },
        function(erro) {
            res.status(500).end();
        }
    );
	}
}

module.exports.getUserOfPost = function(req, res) {
    let promisse = Post.findById(req.params.id).populate("uid").exec()
    promisse.then(
        function(post) {
            res.json(post.uid);
        },
        function(erro) {
            res.status(500).end();
        }
    );
}
