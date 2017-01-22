import mongoose from 'mongoose';

const {Schema} = mongoose;

const schema = new Schema({
    name: String,
    deliveryTime: Number,
    address: String,
    phoneNumber: String
});

export default mongoose.model('Supplier', schema);