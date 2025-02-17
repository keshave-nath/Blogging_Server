const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../../../models/users/users');
const fs = require('fs');
const path = require('path');
const otpData = require('../../../data/support');
const UserPost = require('../../../models/users/userposts');
const UserComment = require('../../../models/users/usercommentscontroller');
const Deleteoncloudinary = require('../../../middleware/deletecloudinary');
const Uploadoncloudinary = require('../../../middleware/cloudinary');


const registerUser = async (req, res) => {

    const { email } = req.body;

    try {
        const saltRounds = 10;
        const { password, ...data } = req.body;

        const ifValidEmail = await User.find({ email: req.body.email });

        if(ifValidEmail) return res.status(400).json({message:'Email already exists'});

        bcrypt.hash(req.body.password, saltRounds, async (error, hash) => {
            if (error) return res.status(203).json({ message: 'somethin went wrong' });

            data.password = hash;

            const dataToSave = new User(data);

            const response = await dataToSave.save();

            const { password, ...responseWithoutPassword } = response._doc;

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.ADMIN_MAIL,
                    pass: process.env.ADMIN_APP_PASSWORD
                }
            });

            const mailOptions = {
                from: 'noreply@mail.com',
                to: email,
                subject: 'Welcome to our Blogging Website',
                html: `<div style="text-align: center;">
                      <h1 >Welcome to our Blogging Website </h1>
                        <h2 >${req.body.username}</h2>
                        <div >
                            <img class="" src='https://i.pinimg.com/originals/bc/9e/4a/bc9e4a15c3b226b8914e57e543defe9e.png' width='150px' height='150px'/>
                        </div>
                     <p>Thank you for registering with us. We're excited to have you on board!</p>
                    <p>You can now access our exclusive features and start exploring our website.</p>
                 <p>If you need any help or have questions, please don't hesitate to contact us.</p>
          </div>
                `
            }

            transporter.sendMail(mailOptions, (error, success) => {
                if (error) return res.status(500).json({ message: 'otp could not genrate', error })

                res.status(200).json({ message: 'Registerd Successfully', data: responseWithoutPassword });
            })

        });

    }
    catch (error) {
        res.status(500).json({ message: 'internal server error' });
    }
};

const loginUser = async (req, res) => {

    const file_path = `${req.protocol}://${req.get('host')}/keshaveBlog-files/users`;
    try {
        const ifValidEmail = await User.find({ email: req.body.email });

        const id = ifValidEmail[0]._id;

        if (ifValidEmail.length === 0) return res.status(400).json({ message: 'invalid User email ' });

        const response = await User.updateOne({
            id,
            $set: { status: true }
        })

        const { password, ...responseWithoutPassword } = ifValidEmail[0];

        bcrypt.compare(req.body.password, ifValidEmail[0].password, async (err, result) => {
            if (err) return res.status(203).json({ message: 'somethin went wrong' });

            if (result !== true) return res.status(401).json({ message: 'invalid password ' });

            const { password, ...withoutPassword } = responseWithoutPassword._doc;

            jwt.sign(withoutPassword, process.env.JWT_KEY, { expiresIn: 60 }, (error, token) => {

                if (error) return res.status(203).json({ message: 'somethin went in jwt wrong' });

                console.log(error)

                res.status(200).json({ message: 'User logged in', data: withoutPassword, file_path });


            })


        });

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' });
    }
}

const viewUser = async (req, res) => {
    try {
        const response = await User.find()

        const file_path = `${req.protocol}://${req.get('host')}/keshaveBlog-files/users/`;
        res.status(200).json({ message: 'Fetched', data: response, file_path })
    }
    catch (error) {
        console.log(error);
    }
}

const genrateOtpUser = async (req, res) => {
    try {
        const { email } = req.body;
        console.log(email);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.ADMIN_MAIL,
                pass: process.env.ADMIN_APP_PASSWORD
            }
        });

        const otp = Math.floor(Math.random() * 1000000);


        const otpDataMap = otpData;
        otpDataMap.set(email, otp);


        const mailOptions = {
            from: 'noreply@mail.com',
            to: email,
            subject: 'Otp for email update',
            text: `Your otp is ${otp}`
        }

        transporter.sendMail(mailOptions, (error, success) => {
            if (error) return res.status(500).json({ message: 'otp could not genrate', error })

            res.status(200).json({ message: 'otp has sent' });
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' });
    }
};

const updatePassword = async (req, res) => {
    try {

        const otpDataMap = otpData;
        const sentOtp = otpDataMap.get(req.body.email);

        if (Number(req.body.userotp) !== (sentOtp)) return res.status(401).json({ message: 'please enter a valid otp' });

        const saltRounds = 10;
        const { password, ...data } = req.body;

        bcrypt.hash(req.body.password, saltRounds, async (error, hash) => {
            if (error) return res.status(203).json({ message: 'somethin went wrong' });

            data.password = hash;

            const response = await User.updateOne(
                { email: req.body.email },
                {
                    $set: { password: data.password }
                }

            );

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.ADMIN_MAIL,
                    pass: process.env.ADMIN_APP_PASSWORD
                }
            });

            const mailOptions = {
                from: 'noreply@mail.com',
                to: req.body.email,
                subject: 'Welcome to Blogging Website',
                html: `<div style="text-align: center;">
                      <h1 >Welcome to Blogging Website </h1>
                        <h2 >${req.body.email}</h2>
                        <div >
                            <img class="" src='https://i.pinimg.com/originals/bc/9e/4a/bc9e4a15c3b226b8914e57e543defe9e.png' width='150px' height='150px'/>
                        </div>
                     <p>Your Password Is Being Successfully Updated !!</p>
          </div>
                `
            }

            transporter.sendMail(mailOptions, (error, success) => {
                if (error) return res.status(500).json({ message: 'otp could not genrate', error })

                res.status(200).json({ message: 'Registerd Successfully', data: response });
            })

        });

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' });
    }
}

const updateUser = async (req, res) => {

    const data = req.body;

    const predata = await User.findById(req.params);


    if (req.files) {

        const filePath = path.resolve(__dirname, '../../../uploads/users');

        if (req.files.profile[0]) {

            const pro = req.files.profile[0].path
            if(predata.profile){
                const ress = await Deleteoncloudinary(predata.profile);
            }
                const res = await Uploadoncloudinary(pro);
                data.profile = res.url;
            
        }
    }

    try {
        const response = await User.updateOne(
            req.params,
            {
                $set: data
            }
        )

        const file_path = `${req.protocol}://${req.get('host')}/keshaveBlog-files/users`;

        res.status(200).json({ message: 'data updated successfully', data: response, file_path });

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' });
    }
};

const viewSingleUser = async (req, res) => {
    try {
        const response = await User.findById(req.params)
        const file_path = `${req.protocol}://${req.get('host')}/keshaveBlog-files/users/`;
        res.status(200).json({ message: 'Fetched', data: response, file_path })
    }
    catch (error) {
        console.log(error);
    }
}

const deleteuser = async (req, res) => {
    try {
        const predata = await User.findById(req.params);
        const predata1 = await UserPost.find({ userr: req.params }).populate('userr');

        if (predata) {

            const filePath = path.resolve(__dirname, '../../../uploads/users');
            

            if (predata.profile) {
                const ress = await Deleteoncloudinary(predata.profile);
            }
        }
        if (predata1) {
            const filePath1 = path.resolve(__dirname, '../../../uploads/user-posts');
            await predata1.forEach((item) => {
                if (item.thumbnail) {
                    const ress =  Deleteoncloudinary(item.thumbnail);
                }
            })

        }

        const response = await User.deleteOne(req.params);
        if (response) {
            await UserPost.deleteMany({ userr: req.params });
            await UserComment.deleteMany({ userrs: req.params });
            console.log('User and their posts deleted successfully');
        }
        res.status(200).json({ message: 'Deleted', data: response })

    }
    catch (error) {
        console.log(error);
    }
}

const statusupdateuser = async (req, res) => {
    try {

        const response = await User.updateOne(req.params, {
            $set: { status: req.body.newvalues }
        })
        res.status(200).json({ message: "Status Updated", data: response })
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {
    registerUser,
    loginUser,
    updateUser,
    viewUser,
    genrateOtpUser,
    updatePassword,
    deleteuser,
    statusupdateuser,
    viewSingleUser
}