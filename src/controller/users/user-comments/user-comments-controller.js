const fs = require('fs');
const path = require('path');
const UserComment = require('../../../models/users/usercommentscontroller');

const adduserComments = async(req,res) => {
    try{

        const data = req.body
        console.log(data)

        // console.log(data)
        const datatosave = new UserComment(data)
        const response = await datatosave.save();
        res.status(200).json({message:'posted',data:response})
    }
    catch(error){
        console.log(error);
    }
}

const viewuserComments = async(req,res) => {
    try{
        const response = await UserComment.find()
        .populate('userrs')
        const file_path = `${req.protocol}://${req.get('host')}/keshaveBlog-files/users/`;
        res.status(200).json({message:'Fetched',data:response,file_path})
    }
    catch(error){
        console.log(error);
    }
}

module.exports = {
    adduserComments,
    viewuserComments,
}