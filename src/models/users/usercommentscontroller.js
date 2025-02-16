const mongoose = require('mongoose')

const UserCommentSchema = mongoose.Schema({


    userrs:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    posts:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userposts',
    },
    comments:{
        type: String,
    },

});

const UserComment = mongoose.model('usercomments',UserCommentSchema);

module.exports = UserComment;