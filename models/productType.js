const mongoose =require('mongoose');

const productTypeSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    created_at:{
        type:Date,
        required:true,
    },
    attributes:[String]
})

module.exports = mongoose.model('productType', productTypeSchema);
