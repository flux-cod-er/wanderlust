const Listing = require("../models/listing");

// Display all listings
module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
};

// Render new listing form
module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

// Show a single listing
module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: { path: "author" },
        })
        .populate("owner");

    if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }

    res.render("listings/show.ejs", { listing });
};

// Create a new listing
module.exports.createListing = async (req, res) => {
    const listing = new Listing(req.body.listing);
    listing.owner = req.user._id; // Attach logged-in user as owner

    // Save image data if file uploaded
    if (req.file) {
        listing.image = {
            url: req.file.path,       // Cloudinary URL
            filename: req.file.filename
        };
    }

    await listing.save();
    req.flash("success", "Successfully created a new listing!");
    res.redirect(`/listings/${listing._id}`);
};

// Render edit form
module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }

    let originalImageUrl = listing.image.url.replace("/upload", "/upload/w_250");
    res.render("listings/edit.ejs", { listing, originalImageUrl });
};

// Update listing
module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing }, { new: true });

if (req.file) {
    listing.image = { // replace the whole image object
        url: req.file.path,
        filename: req.file.filename
    };
    await listing.save();
}

    req.flash("success", "Successfully updated the listing!");
    res.redirect(`/listings/${listing._id}`);
};

// Delete listing
module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Successfully deleted the listing!");
    res.redirect("/listings");
};
