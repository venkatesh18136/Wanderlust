const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing=require("../models/listing.js");
const mongoose = require("mongoose");
const {isLoggedIn,isOwner,validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const { cloudinary,storage} = require("../cloudConfig.js");
const upload = multer({storage});

cloudinary.api.ping()
    .then(result => {
        console.log("Cloudinary authentication successful:", result);
    })
    .catch(err => {
        console.error("Cloudinary ping failed:", err.message);
    });

router.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn,upload.single('listing[image][url]'),validateListing,wrapAsync(listingController.createListing));

//New Route
router.get("/new",isLoggedIn,listingController.renderNewForm);

router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn,isOwner,upload.single('listing[image][url]'),validateListing,wrapAsync(listingController.updateListing))
.delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));



//Edit Route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));


module.exports = router;