const Review = require("../models/review.js");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");
const Listing = require("../models/listening.js");

module.exports.ReviewPost = async (req,res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review); //Get all review obj from the show route

    newReview.author = req.user._id; //store author
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();


    console.log("Review is saved")
    req.flash("success","Review Created Created");
    res.redirect(`/listings/${listing._id}`);

};

module.exports.ReviewDelete = async (req,res) => {
    let { id, reviewId } = req.params;
    
    await Listing.findByIdAndUpdate(id, {$pull : {reviews : reviewId}});  //$pull --> search the id from the reviews and delete it from the listing
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review Deleted");
    res.redirect(`/listings/${id}`);


};
