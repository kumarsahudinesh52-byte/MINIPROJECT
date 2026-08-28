const User = require("../models/user.js");
const {isLoggedIn, saveRedirectUrl} = require("../middleware.js");

module.exports.signup = async(req,res,next) => {
    try{
        let {username , email ,password} = req.body;
    const newUser = new User ({
        email,username
    }); //Create the document
    const registerdUser = await User.register(newUser,password) //give password --> password

    //-->  req.login() is a Passport.js function that logs the user in programmatically.
    req.login(registerdUser, (err) => {
        if(err) {
            return next(err);
        }
        req.flash("success", "Welcome to Wanderlust");
        res.redirect("/listings");
    })
  }
    catch(e){
        req.flash("error",e.message);
        res.redirect("/signup")
    }
   };

module.exports.login =  async (req, res) => {

        // Store a success message in the session using flash.
        // It can be displayed on the next page.
        req.flash("success", "Welcome back to Wanderlust!");
        
        let redirectUrl = res.locals.redirectUrl || "/listings"; 
        //this contion tells when we login in home page no redirecturl created as isLoggedIn is not called --> req.session.redirectUrl = undefine
        //so we need to redirect to listings 

        // After successful login, redirect the user to the listings page.
        // res.redirect("/listings");
        //res.redirect("req.session.redirectUrl"); //go back after login where from the req came
        res.redirect(redirectUrl);
    };
