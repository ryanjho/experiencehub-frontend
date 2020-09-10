// Dependencies
const axios = require('axios');
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:4000';

// Method to build API End Point
const buildUrl = apiPath => {
    return BACKEND_URL + apiPath;
}

export default {
    async merchantLogin(user) {
        try {
            const response = await axios.post(buildUrl('/merchants/login'), user, {withCredentials: true});
            return response.data.data;
        } catch(err) {
            console.log(err);
        }
    },

    async merchantLogout() {
        try {
            const response = await axios.get(buildUrl('/merchants/logout'), { withCredentials: true});
            return response.data.data;
        } catch(err) {
            console.log(err);
        }
    },

    async checkMerchantAuthentication() {
        try {
            const response = await axios.get(buildUrl('/merchants/authentication'), { withCredentials: true});
            return response.data.data
        } catch(err) {
            console.log(err);
        }
    }
}