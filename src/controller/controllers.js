const { 
    addPost,
    viewPost,
    deletePost,
    statusupdate,
    multiDeletePost,
    fetchPostById,
    updatePost
 } = require("./admin/add-post/post-controller");


const {
     adminLogin, genrateOtp, updateEmail, updateAdmin
} = require("./admin/admin-blog/admin-controller");
const { addreports, viewreports, multiDeletereport, deletereport, statusupdatereport } = require("./admin/admin-report/report-controller");

const { addTerms, viewTerms, deleteTerms, statusupdateTerms, multiDeleteTerms, fetchTermsById, updateTerms, activeTerms } = require("./admin/admin-terms/terms-condition-controller");
const { adduserComments, viewuserComments } = require("./users/user-comments/user-comments-controller");
const { adduserPost, viewuserPost, deleteuserPost, statususerupdate, fetchuserPostById, fetchsinglePostById, searchPost } = require("./users/user-posts/user-posts-controller");

const { registerUser, loginUser, updateUser, viewUser, genrateOtpUser, updatePassword, deleteuser, statusupdateuser, viewSingleUser } = require("./users/user/user-controller");

module.exports = {
    adminLogin,
    genrateOtp,
    updateEmail,
    updateAdmin,

    addPost,
    viewPost,
    deletePost,
    statusupdate,
    multiDeletePost,
    fetchPostById,
    updatePost,

    addTerms,
    viewTerms,
    deleteTerms,
    statusupdateTerms,
    multiDeleteTerms,
    fetchTermsById,
    updateTerms,
    activeTerms,

    registerUser,
    loginUser,
    updateUser,
    viewUser,
    genrateOtpUser,
    updatePassword,
    deleteuser,
    statusupdateuser,
    viewSingleUser,
    
    adduserPost,
    viewuserPost,
    deleteuserPost,
    statususerupdate,
    fetchuserPostById,
    fetchsinglePostById,
    searchPost,

    adduserComments,
    viewuserComments,

    addreports,
    viewreports,
    deletereport,
    statusupdatereport,
    multiDeletereport
}