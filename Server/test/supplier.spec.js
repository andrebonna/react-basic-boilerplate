import supplierCommons from './commons/supplier';

const supplier = new supplierCommons();

describe('Supplier Test', () => {

    it('Create Supplier', (done) => {
        supplier.createRandom().then((response)=> {
            done();
        }).catch((err)=> {
            done.fail(err.message);
        });
    });

});