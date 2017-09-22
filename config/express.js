var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var userRouter = require('../app/routes/user.js');
var postRouter = require('../app/routes/post.js');

module.exports = function() {
    var app = express();
    app.set("port", 3000);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:false}));
    app.use(express.static('./public'));
    app.use(cors());
    userRouter(app);
    postRouter(app);
    return app;
}
