var controller = require("../controllers/posts.js");

module.exports = function(app) {
    app.get("/api/posts", controller.listPosts);
    app.get("/api/posts/:id", controller.getPost);
    app.post("/api/posts", controller.insertPost);
    app.delete("/api/posts/:id", controller.removePost);
    app.put("/api/posts", controller.updatePost);
    app.get("/api/posts/:id/users", controller.getUserOfPost);
}