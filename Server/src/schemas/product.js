import mongoose from 'mongoose';

const {Schema} = mongoose;

const schema = new Schema({
    name: String,
    supplier: {
        type: Schema.Types.ObjectId,
        ref: 'Supplier'
    }
});

export default mongoose.model('Product', schema);