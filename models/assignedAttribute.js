const mongoose =require('mongoose');

const assignedAttributeSchema=mongoose.Schema({
    attributeValue:{
        type:mongoose.Schema.ObjectId,
        ref:'attributeValue',
        required:true
    }

})

module.exports = mongoose.model('assignedAttribute', assignedAttributeSchema);
