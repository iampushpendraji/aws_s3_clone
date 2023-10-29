import multer from "multer";
import path from "path";

// Set up the storage for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/'); // Set the destination folder for uploaded files
    },
    filename: function (req, file, cb) {
        // Using new file name so it can be unique
        let file_name = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
        file.object_name = file_name;  // Saving file name as object_name so we can use it while adding file name into db
        cb(null, file_name);
    }
});

// Create a multer instance with the storage configuration
const multerUpload = multer({ storage: storage });

export default multerUpload;