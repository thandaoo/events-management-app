import axios from 'axios';

export const eventsApi = ({method, request, source}) => {
    const url = 'https://mobile-app-interview.awair.is/';
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
        params: request.params,
        cancelToken: source.token,
    };

    switch (method) {
        case 'get':
            return axios.get(url, config);
        case 'post': 
            return axios.post(url, request.params, config);
        case 'delete': 
            return axios.delete(url,config);
        default:
            return axios.get(url, config);
    }
}