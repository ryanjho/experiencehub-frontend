// Dependencies
const axios = require('axios');
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:4000';

// Method to build API End Point
const buildUrl = apiPath => {
    return BACKEND_URL + apiPath;
}

export default {
    // async getAll() {
    //     try {
    //         const response = await apiUtil.get(buildUrl('/experiences'));
    //         return response.data;
    //     } catch(err) {
    //         console.log(err);
    //         return [];
    //     }
    // },
    async getAll() {
        try {
            const response = await axios.get(buildUrl('/experiences'), { withCredentials: true });
            return response.data.data;
        } catch(err) {
            console.log(err);
        }
    },

    async getAllByMerchant(id) {
        try {
            const response = await axios.get(buildUrl(`/merchants/${id}/experiences`), { withCredentials: true});
            return response.data.data;
        } catch(err) {
            console.log(err);
        }
    },

    async getOneById(id) {
        try {
            const response = await axios.get(buildUrl(`/experiences/${id}`), { withCredentials: true});
            return response.data.data;
        } catch(err) {
            console.log(err);
        }
    },

    async create(newExperience) {
        try {
            const response = await axios.post(buildUrl('/experiences'), newExperience);
            return response.data.data;
        } catch(err) {
            console.log(err);
        }
    },
    async delete(experienceId) {
        try {
            const response = await axios.delete(buildUrl(`/experiences/${experienceId}`));
        } catch(err) {
            console.log(err);
        }
    }


}