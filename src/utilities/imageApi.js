const executeApiCall = async (url, payload) => {
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        body: payload
    });
    
    return await response.json();
};

export default {
    post (url, payload) {
        return executeApiCall(url, payload);
    }
}

// uploadImage = async event => {
//     const files = event.target.files;
//     const data = new FormData();
//     data.append('file', files[0]);
//     data.append('upload_preset', 'experience-hub');

//     const response = await fetch('https://api.cloudinary.com/v1_1/dqykhzxtl/upload', {
//         method: 'POST',
//         body: data,
//         mode: 'cors'
//     });

//     return await response.json();
// }