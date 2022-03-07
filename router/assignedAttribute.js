const experss =require('express');
const router=require('express').Router();

const AssignedAttribute=require('../models/assignedAttribute');

//getting all assignedAttribute

router.get('/',async (req,res)=>{
    try {
        const assignedAttribute=await AssignedAttribute.find();
        res.json(assignedAttribute);
    }catch (err){
        res.status(500).json({ message: err.message })
    }
})

//creat one assignedAttribute
router.post('/',async (req,res)=>{
    const OneAssignedAttribute=new AssignedAttribute({
        attributeValue:req.body.attributeValue,
    })
    try {
        const newAssignedAttribute=await OneAssignedAttribute.save();
        res.status(201).json(newAssignedAttribute);
        
    } catch (err) {
        res.status(500).json({ message: err.message })

    }
})

// Updating One assignedAttribute

router.patch('/:id', getAssignedAttribute, async (req, res) => {
    if (req.body.assignedAttribute != null) {
        res.assignedAttribute.attributeValue = req.body.attributeValue
    }
    try {
      const updatedAssignedAttribute = await res.attributeValue.save()
      res.json(updatedAssignedAttribute)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })

//delete One assignedAttribute
router.delete('/:id',getAssignedAttribute,async(req,res)=> {
    try {
        await res.assignedAttribute.remove();
        res.json({ message: 'Deleted assignedAttribute' })

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


// get One assignedAttribute By ID 
async function getAssignedAttribute(req,res,next) {
    let assignedAttribute
    try {
        assignedAttribute=await AssignedAttribute.findById(req.params.id);
        if(assignedAttribute===null) {
            return res.status(404).json({ message: 'Cannot find assignedAttribute' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.assignedAttribute=assignedAttribute;
    next();
}


module.exports = router;