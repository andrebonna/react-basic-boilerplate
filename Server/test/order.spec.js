import supplierCommons from './commons/supplier';
import productCommons from './commons/product';
import orderCommons from './commons/order';

let supplierId;
let productId;
const supplier = new supplierCommons();
const product = new productCommons();
const order = new orderCommons();

describe('Product Test', () => {

    it('Create Supplier', (done) => {
        supplier.createRandom().then((response)=> {
            supplierId = response._id;
            done();
        }).catch((err)=> {
            done.fail(err.message);
        });
    });

    it('Create Product', (done) => {
        product.createRandom({supplierId}).then((response)=>{
            productId = response._id;
            done();
        }).catch((err)=>{
            done.fail(err.message);
        });
    });

    it('Create Order', (done) => {
        order.createRandom({supplierId, productId}).then((response)=>{
            done();
        }).catch((err)=>{
            done.fail(err.message);
        });
    });

});