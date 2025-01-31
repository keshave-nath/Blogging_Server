const mongoose = require('mongoose')

const UserPostSchema = mongoose.Schema({

    thumbnail:{
        type: String,
    },
    userr:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    title:{
        type: String,
    },
    caution:{
        type: String,
    },
    location:{
        type:String,
    },
    detail:{
        type: String,
    },
});

const UserPost = mongoose.model('userposts',UserPostSchema);

module.exports = UserPost;