var controller = require("../controllers/users.js");
let auth = require('../controllers/auth.js');

module.exports = function(app) {
    app.post("/api/users/singin", auth.logar)
        .post("/api/users", controller.insertUser)
        .use("/api/users", auth.checar)
        .get("/api/users", controller.listUsers)
        .get("/api/users/:id", controller.getUser)
        .delete("/api/users/:id", controller.removeUser)
        .put("/api/users/:id", controller.updateUser)
        .get("/api/users/:id/posts", controller.getPostOfUser);
}   
