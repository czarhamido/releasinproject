const experss =require('express');
const router=require('express').Router();

const AttributeValue=require('../models/attribute');

//getting all AttributeValue

router.get('/',async (req,res)=>{
    try {
        const attributeValue=await AttributeValue.find();
        res.json(attributeValue);
    }catch (err){
        res.status(500).json({ message: err.message })
    }
})

//creat one AttributeValue
router.post('/',async (req,res)=>{
    const OneAttributeValue=new AttributeValue({
        name:req.body.name,
        boolean:req.body.boolean,
        date:req.body.date,
    })
    try {
        const newAttributeValue=await OneAttributeValue.save();
        res.status(201).json(newAttributeValue);
        
    } catch (err) {
        res.status(500).json({ message: err.message })

    }
})

//delete One attributes 
router.delete('/:id',getAttributeValue,async(req,res)=> {
    try {
        await res.attributeValue.remove();
        res.json({ message: 'Deleted attributeValue' })

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


// get One getAttributeValue By ID 
async function getAttributeValue(req,res,next) {
    let attributeValue
    try {
        attributeValue=await AttributeValue.findById(req.params.id);
        if(attributeValue===null) {
            return res.status(404).json({ message: 'Cannot find attributeValue' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.attributeValue=attributeValue;
    next();
}


module.exports = router;