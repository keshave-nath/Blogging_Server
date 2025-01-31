const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name:String,
    profile:String,
    password: String,
    email: String
})

const Admin = mongoose.model('blog_admins',adminSchema);

module.exports = Admin;