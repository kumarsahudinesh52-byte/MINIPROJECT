//Require express route
const express = require("express");
const route = express.Router();



//Here we use express-route
//Require the file in server.js
//As we take /users as common in express route so remove all /users from here


//make all app --> to route

//Let make a users Route
//Index-route
route.get("/", (req,res) => {
    res.send("GET for users");
})

//Show-route
route.get("/:id", (req,res) => {
    res.send("GET for user id");
})

//Show-route (Post request)
//Post - users
route.post(":id", (req,res) => {
    res.send("POST for users");
})

//Delete - users
route.delete(":id", (req,res) => {
    res.send("DELETE for users");
})

//We can export the route itself
module.exports = route; //-->export the route itself