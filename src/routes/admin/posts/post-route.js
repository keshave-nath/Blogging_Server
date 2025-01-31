const express = require('express');

const multer = require('multer');
const { addPost, viewPost, deletePost, statusupdate, multiDeletePost, fetchPostById, updatePost } = require('../../../controller/controllers');
const storage = require('../../../middleware/multer');

const uploads = multer({storage: storage('admin-posts')}).fields([
    {
        name:'admin_post',
        maxCount:4
    },
]);

const postroutes = express.Router();

postroutes.post('/add-post',uploads,addPost);
postroutes.get('/view-post',viewPost);
postroutes.delete('/delete-post/:_id',deletePost);
postroutes.post('/update-status/:_id',statusupdate);
postroutes.post('/multi-delete-post',multiDeletePost);
postroutes.post('/fetch-post/:_id',fetchPostById);
postroutes.post('/update-post/:_id',uploads,updatePost);

module.exports = postroutes;