import axios from 'axios';
axios.defaults.timeout = 5000;

const ApiService = (endpoint) => {
    return axios
        .get('https://demo4583279.mockable.io/' + endpoint, {
            headers: {
                accept: 'application/json',
            },
        })
        .then((response) => {
            const respData = response.data;
            return { status: response.status, data: respData };
        })
        .catch((error) => {
            return Promise.reject(error);
        });
};

export default ApiService;
