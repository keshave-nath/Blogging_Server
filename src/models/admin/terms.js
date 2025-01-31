const mongoose = require('mongoose');

const adminTerms=new mongoose.Schema({
    
    term:{
        type:String,
        required:true
    },
    
    condition:String,
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

adminTerms.pre('save',(next)=>{
    this.created_at = new Date();

    next();
});

adminTerms.pre('updateOne',(next)=>{
    this.updated_at = new Date();

    next();
});

adminTerms.pre('deleteOne',(next)=>{
    this.deleted_at = new Date();

    next();
});

const termsModel = mongoose.model('terms',adminTerms);
module.exports = termsModel;