const postModel = require("../../../models/admin/post");
const fs = require('fs');
const path = require('path');


const addPost = async(req,res) => {
    try{

        const data = req.body

        if(req.files){
            if(req.files.admin_post){
                data.admin_post = req.files.admin_post[0].filename
                // if(fs.existsSync(`${filePath}/${predata.profile}`)){
                //     fs.unlinkSync(`${filePath}/${predata.profile}`)
                // }
            }
        }

        // console.log(data)
        const datatosave = new postModel(data)
        const response = await datatosave.save();
        res.status(200).json({message:'posted',data:response})
    }
    catch(error){
        console.log(error);
    }
}

const viewPost = async(req,res) => {
    try{
        const response = await postModel.find()
        const file_path = `${req.protocol}://${req.get('host')}/keshaveBlog-files/admin-posts/`;
        res.status(200).json({message:'Fetched',data:response,file_path})
    }
    catch(error){
        console.log(error);
    }
}

const deletePost = async(req,res) => {
    try{
        const predata = await postModel.findById(req.params._id);
        // console.log(predata)
        if(predata){

            // const  filePath = path.join('D:','ws-cube','react','Next_Js','Blogging_Website','server','src','uploads','admin-posts');
            // const filePath = './../../uploads/admin-posts'
            const  filePath = path.resolve(__dirname, '../../../uploads/admin-posts');
            
            if(predata.admin_post){
                // data.admin_post = req.files.admin_post[0].filename
                if(fs.existsSync(`${filePath}/${predata.admin_post}`)){
                    fs.unlinkSync(`${filePath}/${predata.admin_post}`)
                }
            }
        }
    
        const response = await postModel.deleteOne(req.params);
        res.status(200).json({message:'Deleted',data:response})
    
    }
    catch(error){
        console.log(error);
    }
}

const statusupdate = async(req,res) => {
    try{
        const response = await postModel.updateOne(req.params,{
            $set:{status:req.body.newvalues}
        })
        res.status(200).json({message:"Status Updated",data:response})
    }
    catch(error){
        console.log(error);
    }
}

const multiDeletePost = async(req,res)=>{
    try{
        //  console.log("hello")
        // console.log(req.body)
        const response = await postModel.deleteMany({_id:{$in:req.body.ids}})
        res.status(200).json({message:"Data Deleted"})
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"internal server error"})
    }
}

const fetchPostById = async(req,res)=>{
    try{
        const response = await postModel.findById({_id:req.params._id})
        // .populate('sizes')
        // .populate('colors')
        // .populate('parent_Category')
        // .populate('product_Category')

        const file_path = `${req.protocol}://${req.get('host')}/keshaveBlog-files/admin-posts/`;
        
        res.status(200).json({message:"Success",data:response,file_Path:file_path})
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"Internal Server Error"})
    }
}

const updatePost = async(req,res)=>{ 
    
    const predata = await postModel.findById(req.params._id);

    // console.log(predata)

    if(!predata) return  res.status(404).json({message:'data not found'});

    const data = req.body
    // data.colors=JSON.parse(data.colors)
    // data.sizes=JSON.parse(data.sizes)

    if(req.files){

    // const  filePath = path.join('D:','ws-cube','react','Next_Js','BLOGGING_WEBSITE','backend','src','uploads','admin-posts');
    const  filePath = path.resolve(__dirname, '../../../uploads/admin-posts');

    // console.log(filePath)

       if(req.files.admin_post){
        data.admin_post = req.files.admin_post[0].filename

        if(fs.existsSync(`${filePath}/${predata.admin_post}`)){
            fs.unlinkSync(`${filePath}/${predata.admin_post}`)
        }
    }

    // if(req.files.thumbnail_animation){
    //     data.thumbnail_animation = req.files.thumbnail_animation[0].filename
        
    //     if(fs.existsSync(`${filePath}/${predata.thumbnail_animation}`)){
    //         fs.unlinkSync(`${filePath}/${predata.thumbnail_animation}`)
    //     }
    // }

    //     if(req.files.images){
    //         data.images = req.files.images.map((image) => image.filename)

    //         predata.images.forEach((image) => {
    //             if (fs.existsSync(`${filePath}/${image}`)) {
    //                 fs.unlinkSync(`${filePath}/${image}`);
    //             }
    //         })
            
    //     }
    }
      try{
            const response = await postModel.updateOne(
                req.params,
                {
                    $set:data
                }
            )
            const file_path = `${req.protocol}://${req.get('host')}/keshaveBlog-files/admin-posts/`;
    
            res.status(200).json({ message: 'data updated successfully',data:response,file_path});

            // console.log(data)
            // console.log(req.files);

        }
        
    
    catch(error){
        console.log(error);
        res.status(500).json({message: 'internal server error'});
    }

}


module.exports = {
    addPost,
    viewPost,
    deletePost,
    statusupdate,
    multiDeletePost,
    fetchPostById,
    updatePost
}