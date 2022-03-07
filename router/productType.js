const experss =require('express');
const router=require('express').Router();

const productType=require('../models/productType');

//getting all productType

router.get('/',async (req,res)=>{
    try {
        const productTypes=await productType.find();
        res.json(productTypes);
    }catch (err){
        res.status(500).json({ message: err.message })
    }
})

//creat one productType
router.post('/',async (req,res)=>{
    const OneproductType=new productType({
        name:req.body.name,
        created_at:req.body.created_at,
        attributes:req.body.attributes,
    })
    try {
        const newProductType=await OneproductType.save();
        res.status(201).json(newProductType);
        
    } catch (err) {
        res.status(500).json({ message: err.message })

    }
})

// Updating One ProductType

router.patch('/:id', getProductType, async (req, res) => {
    console.log(req.body);
    if (req.body.name != null) {
      res.ProductType.name = req.body.name;
    }
    if (req.body.created_at != null) {
      res.ProductType.created_at = req.body.created_at
    }
    if (req.body.attributes != null) {
        res.ProductType.attributes = req.body.attributes
    }
    
    try {
      const updatedProductType = await res.ProductType.save()
      res.json(updatedProductType)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })

//delete One ProductType
router.delete('/:id',getProductType,async(req,res)=> {
    try {
        await res.ProductType.remove();
        res.json({ message: 'Deleted ProductType' })

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


// get One ProductType By ID 
async function getProductType(req,res,next) {
    let ProductType
    try {
        ProductType=await productType.findById(req.params.id);
        console.log(ProductType);
        if(ProductType===null) {
            return res.status(404).json({ message: 'Cannot find ProductType' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.ProductType=ProductType;
    console.log(ProductType);
    next();
}


module.exports = router;