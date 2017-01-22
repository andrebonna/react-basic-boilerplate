import httpCommons from './httpCommons';

export default class abstract {

    constructor() {
        this.http = new httpCommons();
    }

    createRandom(parameters){}

    getBody(parameters){}

    get(id) {
        return this.http.get(this.resource, id)
    }

    update(id, body) {
        return this.http.put(this.resource, id, body);
    }

    delete(id) {
        return this.http.remove(this.resource, id);
    }
}