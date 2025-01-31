const express = require('express');

// const adminUploads = require('../../../middleware/adminMulter');
const multer = require('multer');
const { adminLogin, genrateOtp, updateEmail, updateAdmin } = require('../../../controller/controllers');
const storage = require('../../../middleware/multer');


const uploads = multer({storage: storage('admin')}).fields([
    {
        name:'profile',
        maxCount:1
    },
]);

const adminRoutes = express.Router();

adminRoutes.post('/log-in', adminLogin);
adminRoutes.post('/generate-otp',genrateOtp);
adminRoutes.post('/update-email/:_id',updateEmail);
adminRoutes.post('/update-admin/:_id',uploads,updateAdmin);

module.exports = adminRoutes;