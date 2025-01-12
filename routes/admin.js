const express = require('express');
const multer = require('multer');
const path = require('path');

const adminController = require('../controller/admin');
const {isAuthenticated} = require("../utils/isAuthenticated")

const LostItem = require("../models/lostItems");
const FoundItem = require("../models/foundItems");
const DonationItem = require("../models/donationItems");
const DonationItems = require("../models/donationItems");
const LostItems = require("../models/lostItems");
const FoundItems = require("../models/foundItems");


const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads'); // Upload folder ka path
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg'
    ) {
        cb(null, true); // File accept hogi
    } else {
        cb(null, false); // File reject hogi
    }
};

const upload = multer({ storage: fileStorage, fileFilter: fileFilter });

const router = express.Router();
router.post("/add-product",upload.single("image"),adminController.postAddItem)
router.get("/login",adminController.getLogin);

router.post("/login",adminController.postLogin);
router.post("/items/:itemId",isAuthenticated,adminController.postDeleteItem)

router.get('/dashboard', isAuthenticated, (req, res) => {

    Promise.all([
        DonationItems.fetchAll(), // Fetch all donation items
        LostItems.fetchAll(),     // Fetch all lost items
        FoundItems.fetchAll()     // Fetch all found items
    ])
        .then(([donationItems, lostItems, foundItems]) => {
            // Combine all items into a single array
            const allItems = [
                ...donationItems,
                ...lostItems,
                ...foundItems
            ];

            // Render the index page with the combined items
            res.render("admin/dashboard.ejs", {
                title: "Admin-Items",
                path: "Admin-Items",
                items: allItems
            });
        })
        .catch(err => {
            console.error("Error fetching items:", err);
            res.status(500).render("items/index", {
                title: "Home",
                path: "/",
                items: [],
                errorMessage: "Failed to load items. Please try again later."
            });
        });

});

module.exports = router;