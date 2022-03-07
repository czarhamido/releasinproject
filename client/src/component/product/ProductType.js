import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Form,
  FormControl,
  Modal,
  Row,
} from "react-bootstrap";
import OneProduct from "./OneProductType";
import { getProdcutsType,CreatProdcutsType } from "../../redux/prodctTypeSlice";
import { useSelector, useDispatch } from "react-redux";

function ProductType() {
  const productsTypeData = useSelector((state) => state.productsType.data);

  const dipatch = useDispatch();
  const [name,setName]=useState("");
  const [date, setDate] = useState(new Date());
  const [attributes,setAttributes]=useState([ ])

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    dipatch(getProdcutsType());

  }, [dipatch]);

  useEffect(() => {
    console.log(productsTypeData);
  }, [productsTypeData]);

  const handleFormChange = (i,e) => {
    let dataAttribute=[...attributes];
    dataAttribute[i]=e.target.value;
    setAttributes(dataAttribute);
  }

  const addFieldsAttribute = () => {
    let newAtt='';
    setAttributes([...attributes,newAtt]);
  }
  return (
    <div>
      <h1>Product Type</h1>
      <Button onClick={handleShow}>Add New Product Type</Button>
      <Container>
        <Form className="d-flex">
          <FormControl
            type="search"
            placeholder="Search by name"
            className="m-4 "
            aria-label="Search"
          />
        </Form>
        <Row sm={3}>
        {
          
         productsTypeData.length >0 ? productsTypeData.map((product,i)=>(
           <div key={i}>
            <OneProduct {...product} />
            </div>
          )):<h1>nothing..</h1>
          
        }
        </Row>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form >
        <FormControl
          type="text"
          placeholder="Name"
          aria-label="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{margin:"10px"}}

        />
            <FormControl
          type="date"
          value={date}   
          onChange={(e) => setDate(e.target.value)}
          style={{margin:"10px"}}

        />
        {
          attributes.map((att,i)=>{
            return(
            <div    key={i}  >
            <FormControl
            type="text"
            name="name"
            placeholder={"attribute "+i}
            style={{margin:"10px"}}
            value={att}
            onChange={e=>handleFormChange(i,e)}
            />
            </div>
            )
          })
        }
        <Button onClick={addFieldsAttribute}>Add  Attribute..</Button>
      </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>{
            dipatch(CreatProdcutsType({name:name,created_at:date,attributes:attributes}));
            handleClose(); setAttributes([]);setName("");setDate(new Date());
            window.location.reload();

          } }>
            Save 
          </Button>
        </Modal.Footer>
      </Modal>

      </Container>
    </div>
  );
}

export default ProductType;
