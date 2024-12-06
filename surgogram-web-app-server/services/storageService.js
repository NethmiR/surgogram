const { supabase } = require('../superbase');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const sequelize = require('../sequelize');
require('dotenv').config();

const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png'];

async function uploadImage(bucketName, file) {
    try {
        const extension = path.extname(file.originalname).toLowerCase().substring(1);

        if (!ALLOWED_EXTENSIONS.includes(extension)) {
            throw new Error('Invalid file type. Only JPG, JPEG, and PNG are allowed.');
        }

        //generate a unique filename
        const fileName = `${uuidv4()}.${extension}`;

        const { data, error } = await supabase.storage
            .from(bucketName)
            .upload(fileName, file.buffer, {
                contentType: file.mimetype,
            });

        if (error) {
            throw new Error(`Failed to upload image: ${error.message}`);
        }

        const url = `${process.env.SUPABASE_URL}/storage/v1/object/public/${bucketName}/${fileName}`;

        // await saveImageUrlToDatabase(url);
        return url;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
}

// async function saveImageUrlToDatabase(url) {
//     await sequelize.query('UPDATE "User" SET "URL" = $1 WHERE id = $2', {
//         bind: [url, userId],
//         type: sequelize.QueryTypes.UPDATE,
//     });
// }

module.exports = { uploadImage };