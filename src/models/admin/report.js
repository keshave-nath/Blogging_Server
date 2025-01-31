const mongoose = require('mongoose');

const adminreports=new mongoose.Schema({
    thumbnail:{
            type:String,
        },
    name:String,
    username:String,
    reportt:{
        type:String,
    },
    reportid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'posts'
    },
    status:{
        type:Boolean,
        default:true
    }
})

adminreports.pre('save',(next)=>{
    this.created_at = new Date();

    next();
});

adminreports.pre('updateOne',(next)=>{
    this.updated_at = new Date();

    next();
});

adminreports.pre('deleteOne',(next)=>{
    this.deleted_at = new Date();

    next();
});

const reportModel = mongoose.model('reports',adminreports);
module.exports = reportModel;