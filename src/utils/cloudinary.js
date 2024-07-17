import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET    
});


const uploadOnCloudinary = async (localFilePath) =>
    {
        try {
            if(!localFilePath){
                return null
                // upload file on cloudinary
               const response = await cloudinary.uploader.upload(localFilePath, 
                {
                    resource_type:"auto"
                })
                //file has been uploaded successfully 
                console.log("File has been uploaded on cloudinary");
                console.log("******Response ->( " + response +" )**********")
                console.log(`\n response url -> ${response.url}`)
                return response
            }
        } catch (error) {
            //if file is not uplaoded due to error then remove / unlink the file from local url to prevent storage of corupted file
            fs.unlinkSync(localFilePath) // removes the loaccly saved temorary file as the upload failed
            return null
        }
    }

// const uploadResult = cloudinary.uploader
// .upload(
//     'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
//         public_id: 'shoes',
//     }
// )
// .catch((error) => {
//     console.log(error);
// });


export {uploadOnCloudinary}