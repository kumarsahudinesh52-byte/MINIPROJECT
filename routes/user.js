const express = require("express")
//We not need merge params here
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");
const warpAsync = require("../util/warpAsync.js");
const {isLoggedIn, saveRedirectUrl} = require("../middleware.js");

const UserController = require("../controllers/users.js");



//Make router.route
router.route("/signup")
      .get( (req,res) => {
    res.render("./users/signup");
})   
      .post( warpAsync(UserController.signup));

router.route("/login")
      .get( (req,res) => {
    res.render("./users/login.ejs");
})    
      .post(saveRedirectUrl,

    // Passport checks the username/password submitted by the user.
    // "local" means we are using Passport's LocalStrategy.
    passport.authenticate("local", {
        // If authentication fails, send the user back to /login.
        failureRedirect: "/login",

        // If authentication fails, Passport stores an error message
        // in the flash message so we can display it on the login page.
        failureFlash: true
    }),

    // This function runs ONLY when authentication is successful.
    warpAsync(UserController.login)
);


//router.get("/signup", (req,res) => {
  //  res.render("./users/signup");
//});

//post req
//We use try catch for error handle 
//You also can use warpasync but try catch can be better here!
//router.post("/signup",  warpAsync(UserController.signup));


//For login
//router.get("/login", (req,res) => {
  //  res.render("./users/login.ejs");
//})

//Login post req
//we put here saveRediectUrl
//as it need to happen once you give the login info 
// router.post(
//     "/login",saveRedirectUrl,

//     // Passport checks the username/password submitted by the user.
//     // "local" means we are using Passport's LocalStrategy.
//     passport.authenticate("local", {
//         // If authentication fails, send the user back to /login.
//         failureRedirect: "/login",

//         // If authentication fails, Passport stores an error message
//         // in the flash message so we can display it on the login page.
//         failureFlash: true
//     }),

//     // This function runs ONLY when authentication is successful.
//     warpAsync(UserController.login)
// );

//Yes — "local" is a specific name, not something you can randomly change unless you also configured Passport with the same name.



//req.logout() is a Passport.js function used to log the current user out.
router.get("/logout", (req,res,next) => {
    req.logout((err) => {
        //"If logout produced an error, send that error to Express's error-handling middleware."
        if(err){
            return next(err);
        }
        req.flash("success", "You are logged out");
        res.redirect("/listings");
    });
});

//What mean next(err):
//In Express, next() means:
    //"I'm done with this middleware; move to the next middleware."
    //If something went wrong 
    //"Something went wrong. Skip the normal middleware and go to the error-handling middleware."
    //And we have default ExpressError middleware there




module.exports = router;