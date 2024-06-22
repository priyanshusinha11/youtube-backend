import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";
import path from 'path';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            console.error("Error: file path is undefined");
            return null;
        }

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });

        if (!response || !response.url) {
            console.error("Error: Invalid response from Cloudinary", response);
            return null;
        }

        console.log("File is uploaded on Cloudinary", response.url);

        // Deleting the local file after successful upload
        fs.unlinkSync(localFilePath);

        return response;
    } catch (error) {
        console.error("Cloudinary upload error:", error);

        if (localFilePath && fs.existsSync(localFilePath)) {
            try {
                fs.unlinkSync(localFilePath); // removes the locally saved temp file if it exists
            } catch (unlinkError) {
                console.error("Error removing local file:", unlinkError);
            }
        }

        return null;
    }
};

export { uploadOnCloudinary };
