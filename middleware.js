const Listing = require("./models/listening.js");
const {listingSchema, reviewSchema} = require("./schema.js");
const ExpressError = require("./util/ExpressError.js")
const Review = require("./models/review.js");


module.exports.isLoggedIn  = (req,res,next) => {
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl; //Store the path where from req came 
        //So we can directly go there after login and all
        req.flash("error", "you must be logged in to access");
        return res.redirect("/login");
    }
    next(); //next() is important 
}

module.exports.saveRedirectUrl = (req,res,next) => {
    if(req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl //so it can access by all
    }
    next();
}


//module.exports is an object here
//so when we require it some where --> we do {isLoggedIn} so it mean get the function only 
//Yes, if you are using destructuring, the name must match the exported property name. --> so i write isLoggedIn only in {}


//put as an middleware
module.exports.isOwner = async (req,res,next) => {
     let {id} = req.params;
        let listings =  await Listing.findById(id);
        //This all for hoppscotch and postman req
        if(!listings.owner._id.equals(req.user._id)){
            req.flash("error","You don't have permission to edit");
            return  res.redirect(`/listings/${id}`)
        }

        next();
}

//put as an middleware
module.exports.validateListing = (req,res,next) => {
        let {error} = listingSchema.validate(req.body);
    
        if(error){
            let errMsg = error.details.map((el) => el.message).join(","); //-->Join by comma separate (the additional details in error)
            throw new ExpressError(400, errMsg);
        }
        else{
            next(); //Call next normal middleware 3 parameter
        }  
};


//Make it a middleware
module.exports.validateReview = (req,res,next) => {
     let {error} = reviewSchema.validate(req.body);
    if(error) {
        let errMsg =  error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }
    else{
        next();
    }
};


module.exports.isReviewAuthor = async (req,res,next) => {
     let {id, reviewId} = req.params;
        let review =  await Review.findById(reviewId);
        //This all for hoppscotch and postman req
        if(!review.author._id.equals(req.user._id)){
            req.flash("error","You are not the Author of the review");
            return  res.redirect(`/listings/${id}`)
        }

        next();
}




