const mongoose =require('mongoose');

const attributeSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    type:{
        type:mongoose.Mixed ,
        required:true
    },
    attributeValue:{
        type:mongoose.Schema.ObjectId,
        ref:'attributeValue',
        required:true
    }

})

module.exports = mongoose.model('attribute', attributeSchema);
