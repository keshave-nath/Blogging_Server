// const postModel = require("../../../models/admin/post");
const fs = require('fs');
const path = require('path');
const termsModel = require('../../../models/admin/terms');


const addTerms = async(req,res) => {
    try{

        const data = req.body

        // console.log(data)
        const datatosave = new termsModel(data)
        const response = await datatosave.save();
        res.status(200).json({message:'posted',data:response})
    }
    catch(error){
        console.log(error);
    }
}

const viewTerms = async(req,res) => {
    try{
        const response = await termsModel.find()
        // const file_path = `${req.protocol}://${req.get('host')}/keshaveBlog-files/admin-posts/`;
        res.status(200).json({message:'Fetched',data:response})
    }
    catch(error){
        console.log(error);
    }
}

const deleteTerms = async(req,res) => {
    try{
       
        const response = await termsModel.deleteOne(req.params);
        res.status(200).json({message:'Deleted',data:response})
    
    }
    catch(error){
        console.log(error);
    }
}

const statusupdateTerms = async(req,res) => {
    try{
        const response = await termsModel.updateOne(req.params,{
            $set:{status:req.body.newvalues}
        })
        res.status(200).json({message:"Status Updated",data:response})
    }
    catch(error){
        console.log(error);
    }
}

const multiDeleteTerms = async(req,res)=>{
    try{
        //  console.log("hello")
        // console.log(req.body)
        const response = await termsModel.deleteMany({_id:{$in:req.body.ids}})
        res.status(200).json({message:"Data Deleted"})
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"internal server error"})
    }
}

const fetchTermsById = async(req,res)=>{
    try{
        const response = await termsModel.findById({_id:req.params._id})
        // .populate('sizes')
        // .populate('colors')
        // .populate('parent_Category')
        // .populate('product_Category')

        // const file_path = `${req.protocol}://${req.get('host')}/keshaveBlog-files/admin-posts/`;
        
        res.status(200).json({message:"Success",data:response})
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"Internal Server Error"})
    }
}

const updateTerms = async(req,res)=>{ 
    
    const predata = await termsModel.findById(req.params._id);

    // console.log(predata)

    if(!predata) return  res.status(404).json({message:'data not found'});

    const data = req.body
    
      try{
            const response = await termsModel.updateOne(
                req.params,
                {
                    $set:data
                }
            )
            // const file_path = `${req.protocol}://${req.get('host')}/keshaveBlog-files/admin-posts/`;
    
            res.status(200).json({ message: 'data updated successfully',data:response});

            // console.log(data)
            // console.log(req.files);

        }
        
    
    catch(error){
        console.log(error);
        res.status(500).json({message: 'internal server error'});
    }

}

const activeTerms = async( req, res ) => {
    try{
        const response = await termsModel.find({status:true})
        

        if(response.length === 0) return res.status(404).json({message: 'no active categories available'});

        // const file_path = `${req.protocol}://${req.get('host')}/frankandoak-files/products/`;

        // const resData = {...response,filePath}

        res.status(200).json({message: 'success', data: response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'internal server error'});
    }
};


module.exports = {
    addTerms,
    viewTerms,
    deleteTerms,
    statusupdateTerms,
    multiDeleteTerms,
    fetchTermsById,
    updateTerms,
    activeTerms
}