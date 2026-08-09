import cloudinary from '../services/cloudinary.js';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
 
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads',
    allowed_formats: ["jpg", "jpeg", "png"]
  },
});
 
const upload = multer({ storage: storage });

export default upload;