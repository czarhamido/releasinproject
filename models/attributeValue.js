const mongoose =require('mongoose');

const attributeValueSchema=mongoose.Schema({
    name:{
        type:mongoose.Mixed ,
        required:true
    },
    boolean:{
        type:Boolean ,
        required:true
    },
    date:{
        type:Date,
        required:true
    }

})

module.exports = mongoose.model('attributeValue', attributeValueSchema);
