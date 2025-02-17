// const UserPost = require("../../../models/admin/post");
const fs = require('fs');
const path = require('path');
const UserPost = require('../../../models/users/userposts');
const User = require('../../../models/users/users');
const Uploadoncloudinary = require('../../../middleware/cloudinary');
const Deleteoncloudinary = require('../../../middleware/deletecloudinary');
const UserComment = require('../../../models/users/usercommentscontroller');


const adduserPost = async(req,res) => {
    try{

        const data = req.body
        // console.log(data)

        if(req.files){
            if(req.files.thumbnail){
                // data.thumbnail = req.files.thumbnail[0].filename

                const pro = req.files.thumbnail[0].path
 
                    const res = await Uploadoncloudinary(pro);
                    data.thumbnail = res.url;

            }
        }

        // console.log(data)
        const datatosave = new UserPost(data)
        const response = await datatosave.save();
        res.status(200).json({message:'posted',data:response})
    }
    catch(error){
        console.log(error);
    }
}

// const viewuserPost = async(req,res) => {
//     try{
//         // const response = await UserPost.find()
//         // .populate('userr')
//         console.log(req.params.key)

//         const activeUsers = await User.find({ status: true }).select('_id');
//         const activeUserIds = activeUsers.map(user => user._id);
        
//         if(req.params.key){
//             const  response = await UserPost.find({ userr: { $in: activeUserIds },
//                 $or:[
//                 {title: {$regex : new RegExp(req.params.key)}},
//                 {caution: {$regex : new RegExp(req.params.key)}},
//                 {location:{$regex : new RegExp(req.params.key)}},
//                 {userr:{$regex : new RegExp({$in:req.params.key})}},
//                 // post.comments.some((comment) => regex.test(comment.text));
//                 // {colors:{$regex : new RegExp({$in:req.params.key})}}
//             ] }).populate('userr');

           
//         }
//         const  response = await UserPost.find({ userr: { $in: activeUserIds }, }).populate('userr');  
        

           

//         const file_path = `${req.protocol}://${req.get('host')}/keshaveBlog-files/user-posts/`;
//         res.status(200).json({message:'Fetched',data:response,file_path})
//     }
//     catch(error){
//         console.log(error);
//     }
// }

const viewuserPost = async (req, res) => {
    try {
        // console.log(req.params.key);

        // Get active users' IDs
        const activeUsers = await User.find({ status: true }).select('_id');
        const activeUserIds = activeUsers.map(user => user._id);

        let searchCriteria = { userr: { $in: activeUserIds } };

        // Apply search filter if a key is provided
        if (req.params.key) {
            const regex = new RegExp(req.params.key, 'i'); // Case-insensitive search
// console.log(regex)
            const matchingUsers = await User.find({$or:[{ name: regex} ,
               { username : regex,
            }]}).select('_id');
            const matchingUserIds = matchingUsers.map(user => user._id);

            searchCriteria.$or = [
                { title: regex },
                { caution: regex },
                { location: regex },
                {userr:{ $in : matchingUserIds }}
            ];
        }
        // console.log(searchCriteria)
        // Fetch filtered or all posts
        const response = await UserPost.find(searchCriteria).populate('userr');

        const file_path = `${req.protocol}://${req.get('host')}/keshaveBlog-files/user-posts/`;
        res.status(200).json({ message: 'Fetched', data: response, file_path });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};


const deleteuserPost = async(req,res) => {
    try{
        const predata = await UserPost.findById(req.params._id);
        // console.log(predata)
        if(predata){

            // const  filePath = path.join('D:','ws-cube','react','Next_Js','Blogging_Website','server','src','uploads','user-posts');
            const  filePath = path.resolve(__dirname, '../../../uploads/user-posts');
    
            
            if(predata.thumbnail){
                const ress = await Deleteoncloudinary(predata.thumbnail);

            }
        }
    
        const response = await UserPost.deleteOne(req.params)
        if (response) {
            // await UserPost.deleteMany({ userr: req.params });
            await UserComment.deleteMany({ posts: req.params });
            console.log('Posts and their Comments deleted successfully');
        }
        res.status(200).json({message:'Deleted',data:response})
    
    }
    catch(error){
        console.log(error);
    }
}

const statususerupdate = async(req,res) => {
    try{
        const response = await UserPost.updateOne(req.params,{
            $set:{status:req.body.newvalues}
        })
        res.status(200).json({message:"Status Updated",data:response})
    }
    catch(error){
        console.log(error);
    }
}

// const viewCart = async (req, res)=>{
//     try{
//         // console.log(req.params);
//         if(!req.params)return res.status(400).json({message:'Id not found'})
//         const response = await Cart.find({userr:req.params})
//         .populate('color')
//         .populate('size')
//         .populate('userr')
//         .populate('proo');

//         const file_path = `${req.protocol}://${req.get('host')}/frankandoak-files/products/`;

//         res.status(200).json({message: 'success', data:response,file_path:file_path});
//     }
//     catch(error){
//         console.log(error);
//         res.status(500).json({message: 'internal server'});
//     }
// }

const fetchuserPostById = async(req,res)=>{
    try{
        // console.log(req.params)
        if(!req.params)return res.status(400).json({message:'Id not found'})
        const response = await UserPost.find({userr:req.params})
        .populate('userr')
        // .populate('colors')
        // .populate('parent_Category')
        // .populate('product_Category')

        const file_path = `${req.protocol}://${req.get('host')}/keshaveBlog-files/user-posts/`;
        
        res.status(200).json({message:"Success",data:response,file_Path:file_path})
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"Internal Server Error"})
    }
}

const fetchsinglePostById = async(req,res)=>{
    try{
        // console.log(req.params)
        if(!req.params)return res.status(400).json({message:'Id not found'})
        const response = await UserPost.findById({_id:req.params._id})
        .populate('userr')
        // .populate('colors')
        // .populate('parent_Category')
        // .populate('product_Category')

        const file_path = `${req.protocol}://${req.get('host')}/keshaveBlog-files/user-posts/`;
        
        res.status(200).json({message:"Success",data:response,file_Path:file_path})
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"Internal Server Error"})
    }
}

const searchPost = async(req, res)=>{
    try{
        // const response = await parentCategory.find({name: {$regex: new RegExp('e')}}); 
        if(req.params.key){        
        const response = await UserPost.find({$or:[
            {title: {$regex : new RegExp(req.params.key)}},
            {caution: {$regex : new RegExp(req.params.key)}},
            {location:{$regex : new RegExp(req.params.key)}},
            {userr:{$regex : new RegExp({$in:req.params.key})}},
            // post.comments.some((comment) => regex.test(comment.text));
            // {colors:{$regex : new RegExp({$in:req.params.key})}}
        ]})
        // .populate('sizes');

        const file_path = `${req.protocol}://${req.get('host')}/keshaveBlog-files/user-posts/`;
        
        res.status(200).json({message:'success', data: response,file_path:file_path});
    }
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'internal server error'});
    }
};


module.exports = {
    adduserPost,
    viewuserPost,
    deleteuserPost,
    statususerupdate,
    fetchuserPostById,
    fetchsinglePostById,
    searchPost
}