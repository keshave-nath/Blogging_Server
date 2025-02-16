const express = require('express');
const { adduserComments, viewuserComments } = require('../../../controller/controllers');


const usercommentroutes = express.Router();

usercommentroutes.post('/add-user-comments',adduserComments);
usercommentroutes.get('/view-user-comments/:_id',viewuserComments);
// userpostroutes.delete('/delete-user-post/:_id',deleteuserPost);
// userpostroutes.post('/update-user-status/:_id',statususerupdate);
// userpostroutes.post('/multi-delete-post',multiDeletePost);
// userpostroutes.get('/fetch-user-post/:_id',fetchuserPostById);
// userpostroutes.get('/fetch-single-post/:_id',fetchsinglePostById);
// userpostroutes.post('/update-post/:_id',uploads,updatePost);

module.exports = usercommentroutes;