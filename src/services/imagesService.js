// Dependencies
import imageApiUtil from '../utilities/imageApi';

const CLOUDINARY_URL = process.env.REACT_APP_CLOUDINARY_URL || 'https://api.cloudinary.com/v1_1/dqykhzxtl/upload';

export default {
    async uploadImageCloudinary(files) {
        try {
            const data = new FormData();
            data.append('file', files[0]);
            data.append('upload_preset', 'experience-hub');
            const response = await imageApiUtil.post(CLOUDINARY_URL, data);
            return response;
        } catch(err) {
            console.log(err);
            return [];
        }
    },

}