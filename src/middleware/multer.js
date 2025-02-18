

const multer = require('multer');
const path = require('path');

const storage = (foldername)=> multer.diskStorage({
    destination: (req, file, cb) => {
        
        cb(null, `./src/uploads/${foldername}`)
    },
    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname);
        cb(null, Date.now() + Math.floor(Math.random() * 10000) + extension)
    }
});

module.exports = storage;