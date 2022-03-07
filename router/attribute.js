const experss =require('express');
const router=require('express').Router();

const Attribute=require('../models/attribute');

//getting all attributes

router.get('/',async (req,res)=>{
    try {
        const attributes=await Attribute.find();
        res.json(attributes);
    }catch (err){
        res.status(500).json({ message: err.message })
    }
})

//creat one attributes
router.post('/',async (req,res)=>{
    const OneAttribute=new Attribute({
        name:req.body.name,
        type:req.body.type,
        attributeValue:req.body.attributeValue,
    })
    try {
        const newAttribute=await OneAttribute.save();
        res.status(201).json(newAttribute);
        
    } catch (err) {
        res.status(500).json({ message: err.message })

    }
})

// Updating One Attribute

router.patch('/:id', getAttribute, async (req, res) => {
    if (req.body.name != null) {
      res.attribute.name = req.body.name
    }
    if (req.body.type != null) {
      res.attribute.type = req.body.type
    }
    if (req.body.attributeValue != null) {
        res.attribute.attributeValue = req.body.attributeValue
    }
    try {
      const updatedAttribute = await res.attribute.save()
      res.json(updatedAttribute)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })

//delete One attributes
router.delete('/:id',getAttribute,async(req,res)=> {
    try {
        await res.attribute.remove();
        res.json({ message: 'Deleted attribute' })

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


// get One getAttribute By ID 
async function getAttribute(req,res,next) {
    let attribute
    try {
        attribute=await Attribute.findById(req.params.id);
        if(attribute===null) {
            return res.status(404).json({ message: 'Cannot find attribute' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.attribute=attribute;
    next();
}


module.exports = router;