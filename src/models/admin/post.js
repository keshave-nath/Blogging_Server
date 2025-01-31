const mongoose = require('mongoose');

const adminposts=new mongoose.Schema({
    admin_post:String,
    title:{
        type:String,
        required:true
    },
    caution:String,
    location:String,
    detail:String,
    status:{
        type:Boolean,
        default:true
    },
    created_at:{
        type:Date
    },
    updated_at:{
        type:Date
    },
    deleted_at:{
        type:Date
    }
})

adminposts.pre('save',(next)=>{
    this.created_at = new Date();

    next();
});

adminposts.pre('updateOne',(next)=>{
    this.updated_at = new Date();

    next();
});

adminposts.pre('deleteOne',(next)=>{
    this.deleted_at = new Date();

    next();
});

const postModel = mongoose.model('posts',adminposts);
module.exports = postModel;