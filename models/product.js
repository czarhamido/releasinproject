const mongoose =require('mongoose');

const productSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    created_at:{
        type:Date,
        required:true,
    },
    productType:{
        type:String,
        required:true
    },
    assignedAttributes:[

    ]
})

module.exports = mongoose.model('product', productSchema);
