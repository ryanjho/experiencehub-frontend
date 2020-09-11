// Dependencies
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:4000';
const buildUrl = apiPath => {
    return BACKEND_URL + apiPath;
}

export default {
    async getAll() {
        try {
            const response = await axios.get(buildUrl('/users'));
            console.log(response.data);
            return response.data;
        } catch(err) {
            console.log(err);
            return [];
        }
    },

    async create(newUser) {
        try {
            const response = await axios.post(buildUrl('/users'), newUser);
            return response.data.data;
        } catch(err) {
            console.log(err);
        }
    }

}