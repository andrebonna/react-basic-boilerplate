import abstract from './abstract';

export default class order extends abstract {

    constructor() {
        super();
        this.resource = 'order';
    }

    createRandom({supplierId, productId}) {
        const body = this.getBody({supplierId, productId});
        return this.http.post(this.resource, body);
    }

    getBody({supplierId, productId}) {
        const time = new Date().getTime();
        return {
            name: `testName-${time}`,
            supplier: supplierId,
            product: productId
        };
    }
}