const express = require('express');

// const multer = require('multer');
// const { addPost, viewPost, deletePost, statusupdate, multiDeletePost, fetchPostById, updatePost } = require('../../../controller/controllers');
// const storage = require('../../../middleware/multer');
const { addreports, viewreports, multiDeletereport, statusupdatereport, deletereport } = require('../../../controller/controllers');

// const uploads = multer({storage: storage('report-posts')}).fields([
//     {
//         name:'thumbnail',
//         maxCount:4
//     },
// ]);

const reportroutes = express.Router();

reportroutes.post('/add-reports',addreports);
reportroutes.get('/view-reports',viewreports);
reportroutes.delete('/delete-reports/:_id',deletereport);
reportroutes.post('/update-reports/:_id',statusupdatereport);
reportroutes.post('/multi-delete-reports',multiDeletereport);
// reportroutes.post('/fetch-post/:_id',fetchPostById);
// reportroutes.post('/update-post/:_id',uploads,updatePost);

module.exports = reportroutes;