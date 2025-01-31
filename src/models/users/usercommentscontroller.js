const mongoose = require('mongoose')

const UserCommentSchema = mongoose.Schema({


    userrs:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    comments:{
        type: String,
    },

});

const UserComment = mongoose.model('usercomments',UserCommentSchema);

module.exports = UserComment;