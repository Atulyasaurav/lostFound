const express = require('express');

const itemsController = require('../controller/items');
const adminController = require('../controller/admin');

const router = express.Router();

router.get("/", itemsController.getIndex);
router.get("/about",itemsController.getAbout)
router.get("/contact",itemsController.getContactUs)
router.get("/donate",itemsController.getDonateUs)
router.get("/add-item",itemsController.getAddItems)
router.get("/lost-item",itemsController.getLostItem)
router.get("/found-item",itemsController.getFoundItem)
router.get("/privacy-policy",itemsController.getPrivacyPolicy)
router.get("/terms-conditions",itemsController.getTermsCondition)


module.exports = router;


