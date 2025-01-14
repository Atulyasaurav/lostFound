const LostItems = require("../models/lostItems");
const FoundItems = require("../models/foundItems");
const DonationItems = require("../models/donationItems");

const reqAuth = require("../utils/reqAuth")
const express = require("express");

const cloudinary = require('cloudinary').v2; // Cloudinary API

// Cloudinary Configuration
cloudinary.config({
    cloud_name: 'dfhzdqm2o',
    api_key: process.env.cloudinaryApiKey,
    api_secret: process.env.cloudinaryApiSecret,
    secure: true,
});


exports.postAddItem = (req,res,next) => {
    const category = req.body.category;
    const itemCategory = req.body.itemCategory;
    const title = req.body.title;
    const contactNumber = req.body.contact;
    const description = req.body.description;
    console.log(category,itemCategory,title,contactNumber,description);
    console.log(req.body)

    // Check if file is uploaded
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const filePath = req.file.path; // Path of the uploaded file

    // Upload to Cloudinary
    cloudinary.uploader.upload(filePath)
        .then((cloudinaryResponse) => {
            const imageUrl = cloudinaryResponse.secure_url; // Cloudinary image URL

            switch (category) {
                case "lost":
                    const lostItems = new LostItems(title,itemCategory,contactNumber,description,imageUrl,category)
                    lostItems.save()
                        .then(result=>{
                            res.redirect("/");
                        })
                        .catch(err=>console.log(err))
                    break;

                case "found":
                    const foundItems = new FoundItems(title,itemCategory,contactNumber,description,imageUrl,category)
                    foundItems.save()
                        .then(result=>{
                            res.redirect("/");
                        })
                        .catch(err=>console.log(err))
                    break;

                case "donation":
                    const donationItems  = new DonationItems(title,itemCategory,contactNumber,description,imageUrl,category)
                    donationItems.save()
                        .then(result=>{
                            res.redirect("/");
                        })
                        .catch(err=>console.log(err))
                    break;

            }
        })
        .then((result) => {
            res.redirect('/');
        })
        .catch((err) => {
            console.error('Error uploading image or saving Item:', err);
            res.status(500).send('Failed to upload image or save Item.');
        });

}

exports.getLogin = (req,res,next) => {
    res.render('admin/login.ejs',{title:"Admin-Login",path:"/admin/login"});
}

exports.postLogin = async (req, res, next) => {
    console.log(reqAuth)
    const { token, refreshToken, code } = await reqAuth(req.body.email, req.body.password);
    console.log("tokens",token)

    if (code === 200) {
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',  // Only true in production
            maxAge: 60 * 60 * 1000,
        });


        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',  // Only true in production
            maxAge: 60 * 60 * 1000,
        });

        res.redirect('/admin/dashboard');
    } else {
        res.redirect('/');
    }
};


exports.postDeleteItem = (req,res,next)=>{
    const itemId = req.params.itemId;
    const category = req.body.category;
    console.log(itemId,category)

    switch (category) {
        case "lost":
            LostItems.deleteById(itemId)
                .then(result=>res.redirect('/admin/dashboard'))
                .catch(err=>console.log(err))

            break;

        case "found":
            FoundItems.deleteById(itemId)
                .then(result=>res.redirect('/admin/dashboard'))
                .catch(err=>console.log(err))
            break;

        case "donation":
            DonationItems.deleteById(itemId)
                .then(result=>res.redirect('/admin/dashboard'))
                .catch(err=>console.log(err))
            break;

    }




}