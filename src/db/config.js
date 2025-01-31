const mongoose = require('mongoose');
// const { registerAdmin } = require('../controller/admin/admin-blog/admin-controller');
require('dotenv').config();
const url = `mongodb+srv://${process.env.DATA_BASE_USERNAME}:${process.env.DATA_BASE_PASSWORD}.szkk7.mongodb.net/${process.env.DATA_BASE_NAME}?retryWrites=true&w=majority&appName=${process.env.DATABASE_APP_NAME}`;

mongoose.connect(url)
.then(()=>{
    console.log("connect to mongodb");
    // registerAdmin();
})
.catch((error)=>{
    console.log(error);
})