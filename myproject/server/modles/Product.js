import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,

    },
    description: String,
    price:{
        type: Number,
        required: true
    },
    imageUrl: String,
})

const product = mongoose.model('Product', productSchema);

module.exports = product;