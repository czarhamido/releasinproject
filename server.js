const express = require('express')
const mongoose =require('mongoose')

mongoose.connect("mongodb+srv://czar:0698115172@prog.23wn0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

const app = express()
const cors =require("cors")

app.use(cors());

app.use(express.json());

app.use(express.static('client/build'));
app.get("*",cors(),(req,res)=>{
  res.sendFile(`${__dirname}/client/build/index.html`)
})

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Methods","GET,POST,PUT,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers","Content-Type,Authorization");
  next();
  
});

//api ProductType
const ProductType=require('./router/productType');
app.use('/producttype',ProductType);

//api Product
const Product=require('./router/product');
app.use('/product',Product);

//api attribute
const Attribute=require('./router/attribute');
app.use('/attribute',Attribute);

//api assignedAttribute
const AssignedAttribute=require('./router/assignedAttribute');
app.use('/assignedAttribute',AssignedAttribute);

//api attributeValue
const AttributeValue=require('./router/attributeValue');
app.use('/attributeValue',AttributeValue);






app.listen(process.env.PORT || 5000,()=>{
    console.log("Server Started in Port 8000")
})