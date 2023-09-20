const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'A Product must have a name']
    },
    price:{
        type: Number,
        required: [true, 'A product must have a price']
    },
    description: {
        type: String,
        default: 'no Description'
      },
      category:{
        type:String,
        default: 'no category'
      }
})

const Product = mongoose.model('Products', productSchema);

module.exports = Product;
//name,price,category,description
//mongodb+srv://afehid:<password>@cluster0.057qoz5.mongodb.net/