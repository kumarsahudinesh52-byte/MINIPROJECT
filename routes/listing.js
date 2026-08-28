//You need to change all path as per new file 
const express = require("express")
const router = express.Router();
const warpAsync = require("../util/warpAsync.js");
const {listingSchema, reviewSchema} = require("../schema.js");
const Listing = require("../models/listening.js");
const ExpressError = require("../util/ExpressError.js")
const flash  = require("connect-flash");
const {isLoggedIn, saveRedirectUrl, isOwner, validateListing} = require("../middleware.js");
const multer  = require('multer')
// const upload = multer({ dest: 'uploads/' }) //it mean images it will save in upload folder
//if there is no upload folder it create and save
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage }) //now all store in the cloudinary storage


//Require the controller
const listingController = require("../controllers/listings.js");


//Now we use router.route
router.route("/") //this is the common path for all req 
      .get(warpAsync(listingController.index))
      .post(isLoggedIn,upload.single("listing[image]") ,validateListing,warpAsync(listingController.create));
      
      //just to check
      //upload.single('avatar') --> set the filed for the image
      //upload.single("...") = the exact name attribute of the file input.
      //thats why we use listing[image]


      //if attribute is same multer find the input and take the file from there
    
    
//     .post(
//         upload.single("listing[image]"),(req,res) => {
//             console.log(req.file);
//             res.send(req.file);
//         }
//     );


// -->req.isAuthenticated() works for requests coming from Hoppscotch, Postman, browser, etc

//New Route
// Check if the user is logged in; if not, show an error and redirect to listings.
//req.isAuthenticated() is a Passport.js function that checks:
  // --> "Is the current user logged in or not?"
  //if user logged in before --> it return true otherwise false 
router.get("/new",isLoggedIn,(req,res) => {
    //console.log(req.user); means:
    // In user obj generally info stored
    // Print the currently logged-in user's information in the terminal/console

    //Now we directly send middleware -->isLoggedIn
    // if(!req.isAuthenticated()){
    //     req.flash("error", "you must be logged in to create listing!");
    //      return res.redirect("/listings"); //If no return there it goes to render
    // }
    res.render("listing/new.ejs");
})

//As new route need to be in front otherwise mongoose treate /new as /:id route

router.route("/:id")
      .post(isLoggedIn,isOwner,upload.single("listing[image]"),validateListing, warpAsync(listingController.update))
      .delete( isLoggedIn,isOwner, warpAsync(listingController.delete))
      .get( warpAsync(listingController.show));




//ValidateListing middleware --> came in place
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


//Just require the route not enough ---> You need to required all package and all 
//Functions like validateListing ..... etc as per route  
//index route
//shift the async to controllers
//router.get("/", warpAsync(listingController.index))







//Edit route
//Shift to controller
router.get("/:id/edit",isLoggedIn,isOwner,  warpAsync(listingController.edit))



//Update Route
//Shift to controller
//router.post("/:id",isLoggedIn,isOwner,validateListing, warpAsync(listingController.update));


//Delete Route
//Shif to controller
//router.delete("/:id", isLoggedIn,isOwner, warpAsync(listingController.delete));

//Create Route
//Pass the function direct
//router.post("/",validateListing, warpAsync(listingController.create)); //take whole route code as function


//New Route
//We comment this as we modify it upper as with login feature
// router.get("/new", (req,res) => {
//     res.render("listing/new");
// })
//We use this before Show route as if we write after it thing /new as id and search that

//Show Route
//router.get("/:id", warpAsync(listingController.show));

module.exports = router;