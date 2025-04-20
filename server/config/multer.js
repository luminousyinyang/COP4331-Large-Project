const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

//Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '..', 'uploads');
        // Save files in the 'uploads' directory
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${crypto.randomUUID()}-${file.originalname}`;
        // Ensure unique filenames
        cb(null, uniqueName);
    }
});

// Initialize Multer with storage configuration and file size limit
const upload = multer({
    storage,
    limits: {
        // 10MB file size limit
        fileSize: 10000000,
    },
});

module.exports = upload;
