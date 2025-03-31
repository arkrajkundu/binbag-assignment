import multer from 'multer';
import path from 'path';

// Set storage engine for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/profile_pictures');  // Store uploaded profile pictures in 'uploads/profile_pictures'
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);  // Get file extension
    cb(null, `${Date.now()}${fileExt}`);  // Generate a filename using the current timestamp to ensure unique names
  }
});

// Initialize multer with the storage configuration and file type filter
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },  // Limit file size to 5 MB
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;  // Accept image files only
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);  // Accept the file
    } else {
      cb('Error: File upload only supports the following filetypes - jpeg, jpg, png, gif');
    }
  }
}).single('profilePicture');  // 'profilePicture' is the field name for the uploaded file

export default upload;