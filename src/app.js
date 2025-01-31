const express = require('express');
const adminRoutes = require('./routes/admin/admin-login/admin-login-routes');
const postroutes = require('./routes/admin/posts/post-route');
const termsroutes = require('./routes/admin/terms-conditions/terms-condition-routes');
const userRouter = require('./routes/users/user/user-routes');
const userpostroutes = require('./routes/users/user-posts/user-posts-routes');
const usercommentroutes = require('./routes/users/user-comments/user-comments-routes');
const reportroutes = require('./routes/admin/reports/report-routes');

const allRoutes = express.Router();

const websiteRouter = express.Router();
const adminRouter = express.Router();

adminRouter.use('/admin', adminRoutes);
adminRouter.use('/posts',postroutes);
adminRouter.use('/terms-conditions',termsroutes)
adminRouter.use('/reports',reportroutes)

websiteRouter.use('/user',userRouter);
websiteRouter.use('/user-posts',userpostroutes)
websiteRouter.use('/user-comments',usercommentroutes)

allRoutes.use('/blogging-services', websiteRouter);
allRoutes.use('/admin-panel', adminRouter);

module.exports = allRoutes