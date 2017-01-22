import abstract from './abstract';

export default class product extends abstract {

    constructor() {
        super();
        this.resource = 'product';
    }

    createRandom({supplierId}) {
        const body = this.getBody({supplierId});
        return this.http.post(this.resource, body);
    }

    getBody({supplierId}) {
        const time = new Date().getTime();
        return {
            name: `testName-${time}`,
            supplier: supplierId
        };
    }
}