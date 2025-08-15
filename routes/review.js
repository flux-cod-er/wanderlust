const express = require('express');    
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const  reviewController = require("../controllers/review.js");

const { validateReview , isLoggedIn, isReviewAuthor } = require("../middleware.js");


// Create a new review for a listing

    router.post("/",isLoggedIn, validateReview, wrapAsync(reviewController.createReview));

   // Delete a review from a listing
    router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.deleteReview));

     module.exports = router;