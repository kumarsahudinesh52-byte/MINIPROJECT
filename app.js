//After the web dev done we set this variable to production so no other will access it
if(process.env.NODE_ENV != "production"){
   require("dotenv").config(); //By this we can access the env in the other files 
}
//console.log(process.env.SECRET); //Dinesh

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listening.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
//const warpAsync = require("./util/warpAsync.js");
// //warpAsync is the function now
//const {listingSchema, reviewSchema} = require("./schema.js"); //-->Require the obj from the other file
//const Review = require("./models/review.js"); //-->Require review model
const listingRouter = require("./routes/listing");
const reviewRouter = require("./routes/reviews");
const userRouter = require("./routes/user.js");
const session = require("express-session");
//require mongo-store
const {MongoStore} = require("connect-mongo");
const flash  = require("connect-flash");
//passport require 
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./models/user.js");

const dburl = process.env.ATLASDB_URL
//for mongo-store
const store = MongoStore.create({
    mongoUrl : dburl,
    secret : process.env.SECRET,
    touchAfter : 24 * 3600 //mean the sessiondata remain for 24hour than auto expire if you not login 
});


//For updated version  not do that
// store.on("error", () => {
//     console.log("Error in MONGO SESSION STORE", err);
// });


const sessionOptions = {
    store, //Pass the store here
    secret : process.env.SECRET,
    resave : false,
    saveUninitialized : true,
    //Expires and ages of cookie we see
    cookie : {
        expires : Date.now() + 7 * 24 * 60 * 60 * 1000, //as per cal see i set the date from now to after one week --> cookie become expire
        maxAge : 7 * 24 * 60 * 60 * 1000, //time after cookie expire
        httpOnly : true,   //it is true for some security proposes
    },
};



app.use(session(sessionOptions));
app.use(flash());

//it is a middleware initial the passport
app.use(passport.initialize())
//handle the seesion req mean in diff tabs same page yu open like that
app.use(passport.session());
//for all user of User model it checks the authentication
passport.use(new localStrategy(User.authenticate()));



// serializeUser() tells Passport how to store the logged-in user's
// information (usually the user ID) inside the session.
passport.serializeUser(User.serializeUser());


// deserializeUser() tells Passport how to take the user ID from
// the session and find that user again, making it available as req.user.
passport.deserializeUser(User.deserializeUser());




//res.locals is an Express object whose values are available to the template that is rendered during that request.

app.use((req,res,next) => {
    res.locals.success = req.flash("success")
    res.locals.error = req.flash("error")
    res.locals.Curruser = req.user //So we can access req obj (user key) in ejs template
    next();
})

//Demo user 
// app.get("/demouser", async (req,res) => {
//     let fakeUser = new User ({
//         email : "studentgmail.com",
//         username : "delta-student", //as we not define username passport-local-mongoose will handle that
//     });

//     let registerUser = await User.register(fakeUser,"helloworld"); //user-->data with password we can send by .register
//    // User.register() comes from passport-local-mongoose
//    //So password-local-mongoose hash it itself and add salt also all think that he do it owns
//    console.log(registerUser);
// })


//Now we not need the home route otherwise anyone get to this route 
// app.get("/", (req,res) => {
//     res.send("Hi, I am root");
// })

const ExpressError = require("./util/ExpressError.js")

//const MONGO_URl = "mongodb://127.0.0.1:27017/wanderlust";


app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.urlencoded({ extended : true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

main()
.then(() => {
    console.log("connected to DB");
})
.catch((err) => {
    console.log(err);
})

async function main() {
    await mongoose.connect(dburl);
}


//You can remove Joi Schema from here if want because we not use that in app.js anymore
//And the function also i shift to there Listing
//Create a function for use of joi
// const ListingValidator = (req,res,next) => {
//     let {error} = listingSchema.validate(req.body);

//     if(error){
//         let errMsg = error.details.map((el) => el.message).join(","); //-->Join by comma separate (the additional details in error)
//         throw new ExpressError(400, errMsg);
//     }
//     else{
//         next(); //Call next normal middleware 3 parameter
//     }
// }

// const validateReview = (req, res, next) => {
//     let {error} = reviewSchema.validate(req.body);
//     if(error) {
//         let errMsg =  error.details.map((el) => el.message).join(",");
//         throw new ExpressError(400, errMsg);
//     }
//     else{
//         next();
//     }
// }


//These are the parent route we take as common of all route of that category
app.use("/listings", listingRouter);
//But when you need to access parent route parameter like here :id
//You need mergeParams to connect parent route --> (paramater) and child route 
app.use("/listings/:id/reviews", reviewRouter)
app.use("/", userRouter);
//Reviews
//Post Route
// app.post("/listings/:id/reviews", validateReview , warpAsync(async (req,res) => {
//     let listing = await Listing.findById(req.params.id);
//     let newReview = new Review(req.body.review); //Get all review obj from the show route


//     listing.reviews.push(newReview);

//     await newReview.save();
//     await listing.save();


//     console.log("Review is saved")
//     res.redirect(`/listings/${listing._id}`);

// })

// );

// //Delete Review Route
// app.delete("/listings/:id/reviews/:reviewId",warpAsync(async (req,res) => {
//     let { id, reviewId } = req.params;
    
//     await Listing.findByIdAndUpdate(id, {$pull : {reviews : reviewId}});  //$pull --> search the id from the reviews and delete it from the listing
//     await Review.findByIdAndDelete(reviewId);

//     res.redirect(`/listings/${id}`);
// }))




//--> checking sample data insert
// app.get("/testListing", async (req,res) => {
//     let sampleListing = new Listing ({
//         title : "My New villa",
//         description : "By the beach",
//         price : 1200,
//         location : "calangute, Goa",
//         country : "India",
//     });

//     await sampleListing.save();
//     console.log("sample save");
//     res.send("successful testing");
// })

//*--> is get older now so error came so use /*splat
app.all("/*splat", (req,res,next) => {
    next(new ExpressError(404, "Page Not Found!"));
})

//middleware --> (for error)
//Why we need --> Like if Anyone send direct post req from hoppscoth (or) postman
//Like if price : abc --> (if you not define type = "number") so abc accepted
app.use((err,req,res,next) => {
  let {statusCode = 500, message = "Something error occure"} = err;
  res.status(statusCode).render("error.ejs", {message});
})
 


app.listen(8080, () =>{
    console.log("server is listening to port 8080");
})