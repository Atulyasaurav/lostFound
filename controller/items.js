const DonationItems = require("../models/donationItems");
const FoundItems = require("../models/foundItems");
const LostItems = require("../models/lostItems");

exports.getAddItems  = (req,res,next) => {
    res.render("items/add-item",{title:"Add Items",path:"/add-item"});
}

exports.getIndex = (req, res, next) => {
    // Fetch data from all collections
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
            res.render("items/index", {
                title: "Home",
                path: "/",
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
};


exports.getAbout  = (req,res,next) => {
    res.render("items/about",{title:"About Us",path:"/about"});
}

exports.getContactUs  = (req,res,next) => {
    res.render("items/contact-us",{title:"Contact Us",path:"/contact"});
}


exports.getDonateUs  = (req,res,next) => {
    DonationItems.fetchAll()
        .then(donationItems => {
            res.render("items/donate-us", {title: "Donate Us", path: "/donate", items: donationItems});
        })
        .catch(err => console.log(err))
}


exports.getLostItem  = (req,res,next) => {
    LostItems.fetchAll()
        .then(lostItems=>{
            res.render("items/lost-item",{title:"Lost Items",path:"/lost-item",items:lostItems});
        })
        .catch(err=>console.log(err))
}


exports.getFoundItem  = (req,res,next) => {
    FoundItems.fetchAll()
        .then(foundItems=>{
            res.render("items/found-item",{title:"Found Items",path:"/found-item",items:foundItems});
        })
        .catch(err=>console.log(err))
}


exports.getPrivacyPolicy = (req,res,next)=>{
    res.render("policy/privacyPolicy",{title:"Privacy Policy",path:"/privacy-policy"})
}

exports.getTermsCondition = (req,res,next)=>{
    res.render("policy/termsCondition",{title:"Terms Condition",path:"/terms-condition"})
}