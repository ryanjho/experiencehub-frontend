// Dependencies
import apiUtil from '../utilities/api';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:4000';
const buildUrl = apiPath => {
    return BACKEND_URL + apiPath;
}

export default {
    async getAll() {
        try {
            const response = await apiUtil.get(buildUrl('/users'));
            console.log(response.data);
            return response.data;
        } catch(err) {
            console.log(err);
            return [];
        }
    },

}