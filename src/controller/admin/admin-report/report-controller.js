const fs = require('fs');
const path = require('path');
const reportModel = require('../../../models/admin/report');

const addreports = async(req,res) => {
    try{

        const data = req.body
        // console.log(data)

        // console.log(data)
        const datatosave = new reportModel(data)
        const response = await datatosave.save();
        res.status(200).json({message:'posted',data:response})
    }
    catch(error){
        console.log(error);
    }
}

const viewreports = async(req,res) => {
    try{
        const response = await reportModel.find()
        // .populate('userr')
        const file_path = `${req.protocol}://${req.get('host')}/keshaveBlog-files/user-posts/`;
        res.status(200).json({message:'Fetched',data:response,file_path})
    }
    catch(error){
        console.log(error);
    }
}

const deletereport = async(req,res) => {
    try{
       
        const response = await reportModel.deleteOne(req.params);
        res.status(200).json({message:'Deleted',data:response})
    
    }
    catch(error){
        console.log(error);
    }
}

const statusupdatereport = async(req,res) => {
    try{
        const response = await reportModel.updateOne(req.params,{
            $set:{status:req.body.newvalues}
        })
        res.status(200).json({message:"Status Updated",data:response})
    }
    catch(error){
        console.log(error);
    }
}

const multiDeletereport= async(req,res)=>{
    try{
        const response = await reportModel.deleteMany({_id:{$in:req.body.ids}})
        res.status(200).json({message:"Data Deleted"})
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"internal server error"})
    }
}


module.exports = {
    addreports,
    viewreports,
    deletereport,
    statusupdatereport,
    multiDeletereport
}