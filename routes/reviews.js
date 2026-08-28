const express = require("express")
const router = express.Router({mergeParams: true});
const { reviewSchema} = require("../schema.js");
const Listing = require("../models/listening.js");
const Review = require("../models/review.js");
const warpAsync = require("../util/warpAsync.js");
const ExpressError = require("../util/ExpressError.js");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");

const ReviewController = require("../controllers/review.js")

//Make it a middleware
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

//Reviews
//Post Route
//Before validate we need to check isLoggedIn so it should before it 
router.post("/", isLoggedIn,validateReview , warpAsync(ReviewController.ReviewPost));

//Delete Review Route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,warpAsync(ReviewController.ReviewDelete));

module.exports = router;