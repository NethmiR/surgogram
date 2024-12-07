const { supabase } = require('../superbase');
const sequelize = require('../sequelize');
require('dotenv').config();

const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png'];

async function uploadImage(bucketName, file) {
    try {
        const randomNum = Math.floor(Math.random() * 10000) + 1;
        const fileName = `${Date.now()}-${randomNum}-${file.originalname}`.replace(/ /g, '_').toLowerCase();

        const { data, error } = await supabase.storage
            .from(bucketName)
            .upload(fileName, file.buffer, {
                contentType: file.mimetype,
            });

        if (error) {
            throw new Error(`Failed to upload image: ${error.message}`);
        }

        const url = `${process.env.SUPABASE_URL}/storage/v1/object/public/${bucketName}/${fileName}`;
        return url;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
}

module.exports = { uploadImage };