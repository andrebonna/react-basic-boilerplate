import config from '../../config/config';
import request from 'request-promise-native';

export default class httpCommons {

    constructor() {
        this.url = `${config.protocol}://${config.address}:${config.port}/`;
    }

    get(resource, id) {
        return request.get(`${this.url}${resource}/${id}`).then((response)=>(JSON.parse(response)));
    }

    post(resource, body) {
        const options = {
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(body)
        };
        return request.post(`${this.url}${resource}`, options).then((response)=>(JSON.parse(response)));
    }

    put(resource, id, body) {
        const options = {
            url: `${this.url}${resource}/${id}`,
            headers: {
                'content-type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify(body)
        };
        return request(options).then((response)=>(JSON.parse(response)));
    }

    remove(resource, id) {
        const options = {
            url: `${this.url}${resource}/${id}`,
            method: 'DELETE'
        };
        return request(options);
    }
}