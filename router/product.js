const experss =require('express');
const router=require('express').Router();

const Product=require('../models/product');

//getting all product

router.get('/',async (req,res)=>{
    try {
        const products=await Product.find();
        res.json(products);
    }catch (err){
        res.status(500).json({ message: err.message })
    }
})

//creat one product
router.post('/',async (req,res)=>{
    const Oneproduct=new Product({
        name:req.body.name,
        created_at:req.body.created_at,
        productType:req.body.productType,
        assignedAttributes:req.body.assignedAttributes,

    })
    try {
        const newProduct=await Oneproduct.save();
        res.status(201).json(newProduct);
        
    } catch (err) {
        res.status(500).json({ message: err.message })

    }
})

// Updating One product

router.patch('/:id', getProduct, async (req, res) => {
    if (req.body._id != null) {
        res.product._id = req.body._id
      }
    if (req.body.name != null) {
      res.product.name = req.body.name
    }
    if (req.body.created_at != null) {
      res.product.created_at = req.body.created_at
    }
    if (req.body.productType != null) {
        res.product.productType = req.body.productType
    }
    if (req.body.assignedAttributes != null) {
        res.product.assignedAttributes = req.body.assignedAttributes
    }
    try {
      const updatedProduct = await res.product.save()
      res.json(updatedProduct)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })

//delete One Product
router.delete('/:id',getProduct,async(req,res)=> {
    try {
        await res.product.remove();
        res.json({ message: 'Deleted Product' })

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


// get One Product By ID 
async function getProduct(req,res,next) {
    let product
    try {
        product=await Product.findById(req.params.id);
        if(product===null) {
            return res.status(404).json({ message: 'Cannot find Product' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.product=product;
    next();
}


module.exports = router;