import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config(); 

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "Skinova",
    allowed_formats: ["png", "jpg", "jpeg" , "webp"],
    format: "webp",        
    quality: "auto:good",
    fetch_format: "auto", 
  },
});

export {
  cloudinary,
  storage,
};