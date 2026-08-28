//Require express route
const express = require("express");
const route = express.Router();


route.get("/", (req,res) => {
    res.send("GET for posts");
})

//Show-route for posts
route.get("/:id", (req,res) => {
    res.send("GET for user posts");
})

//Show-route (Post request)
//Post - posts
route.post("/:id", (req,res) => {
    res.send("POST for posts");
})

//Delete - posts
route.delete("/:id", (req,res) => {
    res.send("DELETE for posts");
})

module.exports = route