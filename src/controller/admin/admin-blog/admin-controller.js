const otpData = require('../../../data/support');
const Admin = require('../../../models/admin/admin');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const Uploadoncloudinary = require('../../../middleware/cloudinary');
const Deleteoncloudinary = require('../../../middleware/deletecloudinary');

// const Uploadoncloudinary = require( '../../../middleware/cloudinary');

require('dotenv').config();

const registerAdmin = async () => {
    const preData = await Admin.find();

    if (preData.length !== 0) return console.log(preData);

    const data = {
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD
    };

    const dataToSave = new Admin(data);
    const response = await dataToSave.save();
    // const deletee = await dataToSave.deleteOne();

    // console.log(response);


};

const adminLogin = async (req, res) => {
    try {
        const ifValidEmail = await Admin.find({ email: req.body.email });

        if (ifValidEmail.length === 0) return res.status(400).json({ message: 'invalid admin email ' });

        if (ifValidEmail[0].password !== req.body.password) return res.status(401).json({ message: 'invalid password ' });

        res.status(200).json({ message: 'admin logged in', data: ifValidEmail });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' });
    }
}

const genrateOtp = async (req, res) => {
    try {
        const { email } = req.body;

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

const updateEmail = async (req, res) => {
    try {
        const otpDataMap = otpData;
        const sentOtp = otpDataMap.get(req.body.email);

        if (Number(req.body.userotp) !== (sentOtp)) return res.status(401).json({ message: 'please enter a valid otp' });

        const response = await Admin.updateOne(
            req.params,
            {
                $set: { email: req.body.newemail }
            }
        );
        console.log(req.body)
        res.status(200).json({ message: 'email has updated', data: response });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' });
    }
}

const updateAdmin = async (req, res) => {

    const data = req.body;
    // console.log(req.body)

    const predata = await Admin.findById(req.params._id);
    // console.log(predata)
    if (req.files) {

        // const  filePath = path.join('D:','ws-cube','react','Next_Js','Blogging_Website','server','src','uploads','admin');
        const filePath = path.resolve(__dirname, '../../../uploads/admin');

        if (req.files.profile[0]) {
            const pro = req.files.profile[0].path

            if(predata.profile){
                const ress = await Deleteoncloudinary(predata.profile);
            }

                const res = await Uploadoncloudinary(pro);
                data.profile = res.url;
            
            
        }
    }

    // console.log(data);

    try {
        const response = await Admin.updateOne(
            req.params,
            {
                $set: data
            }
        )

        const file_path = `${req.protocol}://${req.get('host')}/keshaveBlog-files/admin`;

        res.status(200).json({ message: 'data updated successfully', data: response, file_path });
        // console.log(file_path)
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' });
    }
};

module.exports = {
    registerAdmin,
    adminLogin,
    genrateOtp,
    updateEmail,
    updateAdmin
};


// sultan.khan@wscubetech.com