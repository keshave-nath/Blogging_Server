const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    profile:{
        type: String,
    },
    name:{
        type:String,
    },
    type:{
        type:String,
    },
    bio:{
        type:String,
    },
    username:{
        type:String,
        require:true,
        unique:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    status:{
        type:Boolean,
        default:true
    },
    password:String
});

const User = mongoose.model('users', userSchema);

module.exports = User;