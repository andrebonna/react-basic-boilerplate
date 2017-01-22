import SupplierCommons from './commons/supplier';
import ProductCommons from './commons/product';

let supplierId;
let productId;
let product;
const supplierCommons = new SupplierCommons();
const productCommons = new ProductCommons();

describe('Product Test', () => {

    it('Create Supplier', (done) => {
        supplierCommons.createRandom().then((response)=> {
            supplierId = response._id;
            done();
        }).catch((err)=> {
            done.fail(err.message);
        });
    });


    it('Create Product', (done) => {
        productCommons.createRandom({supplierId}).then((response)=> {
            productId = response._id;
            done();
        }).catch((err)=> {
            done.fail(err.message);
        });
    });

    it('Get Product', (done) => {
        productCommons.get(productId).then((response)=> {
            product = response;
            done();
        }).catch((err)=> {
            done.fail(err.message);
        });
    });

    it('Update Product', (done) => {
        productCommons.update(productId, Object.assign(product, {name: 'newName'})).then((response)=> {
            done();
        }).catch((err)=> {
            done.fail(err.message);
        });
    });

    it('Delete Product', (done) => {
        productCommons.delete(productId).then((response)=> {
            done();
        }).catch((err)=> {
            done.fail(err.message);
        });
    });

});