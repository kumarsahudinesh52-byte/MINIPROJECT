//This Classroom folder is only for learning express routes --> it is not related to project

const express = require("express");
const app = express();
//Require the routes
const users = require("./routes/user.js");
const posts = require("./routes/post.js");
const cookieParser = require("cookie-parser") //it's a package you need to dowload it first
const session = require("express-session");
const flash  = require("connect-flash");
const path = require("path");

const sessionOptions = {
    secret : "mysupersecretstring",
    resave : false,
    saveUninitialized : true,
};

//You need views folder for that use of flash
app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));


//Just pass the obj
app.use(session(sessionOptions));
app.use(flash());




app.get("/register", (req,res) => {
    let {name = "anonymous"} = req.query;
    req.session.name = name;
    //as we do if else 
    if(name == "anonymous"){
      req.flash("error","user not registered");
    }
    else{
      req.flash("success", "user required successfully");
    }
    // we send here flash
    //success is the key and the message we send with it
    //but req.flash is not enough for print the flash message

    res.redirect("/hello");
})

app.get("/hello", (req,res) => {
    //as session is a obj so we can access it in other route also
    //res.send(`Hello, ${req.session.name}`);
    //We can do better than this
    //res.render("page", {name : req.session.name, msg : req.flash("success")}) //you can send the flash info by its key
    
    //locals directly send the variable to the render file itself 
    //like here successMsg  is varibale so change msg --> successMsg in template

    //Make two local variable
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error");
    res.render("page",{name:req.session.name})

})




//We can write even shorter to this
// app.use(session({
//     secret : "mysupersecretstring",
//     resave : false, //for avoid a warning
//     saveUninitialized : true, //for avoid a warning
// }));

app.use(cookieParser("secrectCode")); //it's a miidleware
//You need to send a string in cookieParser for signed cookie



//count How many time you go to the route
app.get("/request", (req,res) => {
    //session is a obj of req we create a count variable of that obj
    //req.session.count = 1;
    //code
    if(req.session.count){ //if variable exist mean not zero than ++
        req.session.count++;
    }
    else{ //otherwise set it to 1
        req.session.count = 1;
    }

    res.send(`You sent a request ${req.session.count} times`);

});


//test-route
//session-id will same if you access same rote in multiple tab in one device
app.get("/test", (req,res) => {
    res.send("test successful");
})



//Send Cookies from routes
app.get("/getcookies", (req,res) => {
    res.cookie("great", "Namaste");
    res.cookie("Greet","Hello");
    res.send("Cookie sended");
})

app.get("/verify", (req,res) => {
    console.log(req.cookies) //Only print normal cookie
    console.log(req.signedCookies) //it print signedCookies
    //if you change the value of signedcookie it return next time {} null empty string
    //if you only chnage the value part like ---> s%3AIndia.uBFQJBu4Ase4jlBlH5Z2K0dBrc%2BQJYmYsc5T1t5fAvE to s%3AChina.uBFQJBu4Ase4jlBlH5Z2K0dBrc%2BQJYmYsc5T1t5fAvE
    //only value part change so it give _cookiename : false
    res.send("Hi");
})

app.get("/", (req,res) => {
    console.dir(req.cookies);//You cant parse or read cookies directly like this
    res.send("Hi, I am root! ");
})

//Signedcookie
app.get("/getsignedcookie", (req,res) => {
    res.cookie("MadeIn", "India" ,{signed : true}) //To make the cookie signedOne
    res.send("Hello")
})

//Small use of cookie
app.get("/greet", (req,res) => {
    let {name = "anonymous"} = req.cookies; //We found cookies with name if not we set default name = anonymous
    res.send(`HI, ${name}`);
})

//Set common path as /users
app.use("/users",users)
app.use("/posts",posts);


//I comment out this as we use express-route store all userRoute in different folder
// //Let make a users Route
// //Index-route
// app.get("/users", (req,res) => {
//     res.send("GET for users");
// })

// //Show-route
// app.get("/users/:id", (req,res) => {
//     res.send("GET for user id");
// })

// //Show-route (Post request)
// //Post - users
// app.post("/user/:id", (req,res) => {
//     res.send("POST for users");
// })

// //Delete - users
// app.delete("/user/:id", (req,res) => {
//     res.send("DELETE for users");
// })

//Same for posts route as we use express.Router()
//posts
//Index-route
// app.get("/posts", (req,res) => {
//     res.send("GET for posts");
// })

// //Show-route for posts
// app.get("/posts/:id", (req,res) => {
//     res.send("GET for user posts");
// })

// //Show-route (Post request)
// //Post - posts
// app.post("/posts/:id", (req,res) => {
//     res.send("POST for posts");
// })

// //Delete - posts
// app.delete("/posts/:id", (req,res) => {
//     res.send("DELETE for posts");
// })


app.listen(3000, () => {
    console.log("server is listening to 3000");
})
