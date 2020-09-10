// Dependencies
const axios = require('axios');
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:4000';

// Method to build API End Point
const buildUrl = apiPath => {
    return BACKEND_URL + apiPath;
}

export default {
    async getAll() {
        try {
            const response = await axios.get(buildUrl('/merchants'), { withCredentials: true });
            console.log(response);
            return response.data.data;
        } catch(err) {
            console.log(err);
            return [];
        }
    },

    async getOneById(id) {
        try {
            const response = await axios.get(buildUrl(`/merchants/${id}`), { withCredentials: true});
            return response.data.data;
        } catch(err) {
            console.log(err);
            return []
        }
    },

    async create(newMerchant) {
        try {
            const response = await axios.post(buildUrl('/merchants'), newMerchant);
            return response.data.data;
        } catch(err) {
            console.log(err);
            return [];
        }

    }
}