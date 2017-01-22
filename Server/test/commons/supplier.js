import abstract from './abstract';

export default class supplier extends abstract {

    constructor() {
        super();
        this.resource = 'supplier';
    }

    createRandom() {
        const body = this.getBody();
        return this.http.post(this.resource, body);
    }

    getBody() {
        const time = new Date().getTime();
        return {
            name: `testName-${time}`,
            deliveryTime: time,
            address: `testAddress-${time}`,
            phoneNumber: `${time}`
        };
    }
}