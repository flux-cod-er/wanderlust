const Review = require("../models/review.js");
const Listing = require("../models/listing.js") 

module.exports.createReview = async (req, res) => {
    // Find the listing by its ID from the URL (eg 687d1ad486dc2950c343f38e )
    let listing = await Listing.findById(req.params.id);

    // Create a new review using the data from req.body.review
    let newReview = new Review(req.body.review);

    newReview.author = res.locals.currUser._id; // Set the author of the review to the current user
    // Add the new review to the listing's reviews array
    listing.reviews.push(newReview);

    // Save the new review in the database
    await newReview.save();

    // Save the updated listing (with the new review)
    await listing.save();
    
    // Flash a success message
    req.flash("success", "Successfully added a new review!");

    // Redirect back to the listing's page
    res.redirect(`/listings/${listing._id}`);
    };

module.exports.deleteReview =  async (req , res ) => {
    let {id,reviewId} = req.params;
    await Listing.findByIdAndUpdate(id, {$pull :{reviews : reviewId}});
    
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review deleted!");
    res.redirect(`/listings/${id}`);
};