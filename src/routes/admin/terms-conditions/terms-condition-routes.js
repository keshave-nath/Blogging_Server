const express = require('express');
const { 
    addTerms,
    viewTerms,
    deleteTerms,
    statusupdateTerms,
    multiDeleteTerms,
    fetchTermsById,
    updateTerms,
    activeTerms
 } = require('../../../controller/controllers');

// const multer = require('multer');

// const storage = require('../../../middleware/multer');

// const uploads = multer({storage: storage('admin-posts')}).fields([
//     {
//         name:'admin_post',
//         maxCount:4
//     },
// ]);

const termsroutes = express.Router();

termsroutes.post('/add-terms',addTerms);
termsroutes.get('/view-terms',viewTerms);
termsroutes.delete('/delete-terms/:_id',deleteTerms);
termsroutes.post('/update-status-terms/:_id',statusupdateTerms);
termsroutes.post('/multi-delete-terms',multiDeleteTerms);
termsroutes.post('/fetch-terms/:_id',fetchTermsById);
termsroutes.get('/fetch-active-terms',activeTerms);
termsroutes.post('/update-terms/:_id',updateTerms);

module.exports = termsroutes;