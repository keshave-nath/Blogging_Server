const express = require('express');

const multer = require('multer');

const storage = require('../../../middleware/multer');
const { 
    adduserPost,
     viewuserPost,
      deleteuserPost,
       statususerupdate,
        fetchuserPostById,
         fetchsinglePostById,
         searchPost
         } = require('../../../controller/controllers');

const uploads = multer({storage: storage('user-posts')}).fields([
    {
        name:'thumbnail',
        maxCount:4
    },
]);

const userpostroutes = express.Router();

userpostroutes.post('/add-user-post',uploads,adduserPost);
userpostroutes.get('/view-user-post/:key?',viewuserPost);
userpostroutes.delete('/delete-user-post/:_id',deleteuserPost);
userpostroutes.post('/update-user-status/:_id',statususerupdate);
// userpostroutes.post('/multi-delete-post',multiDeletePost);
userpostroutes.get('/fetch-user-post/:_id',fetchuserPostById);
userpostroutes.get('/fetch-single-post/:_id',fetchsinglePostById);
userpostroutes.get('/search-post/:key',searchPost);
// userpostroutes.post('/update-post/:_id',uploads,updatePost);

module.exports = userpostroutes;