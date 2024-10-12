import { v2 as cloudinary } from "cloudinary"

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const cloudinaryUpload = async (localFilePath) => {
    try {
        if(!localFilePath) return ["File path not found"]
        const uploadResult = await cloudinary.uploader.upload(
           localFilePath, {resource_type: "auto"}
       )  
        return uploadResult
    } catch (error) {
        fs.unlinkSync(localFilePath)
        return null;
    }
}

export default cloudinaryUpload;

