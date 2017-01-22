import mongoose from 'mongoose';

const {Schema} = mongoose;

const schema = new Schema({
    name: String,
    supplier: {
        type: Schema.Types.ObjectId,
        ref: 'Supplier'
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }
});

export default mongoose.model('Order', schema);