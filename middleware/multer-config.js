const multer = require('multer');

/**
 * Extension names
 */
const MIME_TYPES = {
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'image/png': 'png'
};

/**
 * Permit to name the file and to put it into our images folder
 */
const storage = multer.diskStorage({
    destination: (req, file, callback) => callback(null, 'images'),
    filename : (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
})

module.exports = multer({storage}).single('image');