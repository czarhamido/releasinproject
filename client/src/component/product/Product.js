import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Form,
  FormControl,
  Modal,
  Row,
} from "react-bootstrap";
import OneProduct from "./OneProduct";
import { CreatProdcuts,getProdcut } from "../../redux/productSlice";
import { useSelector, useDispatch } from "react-redux";

function Product() {
  const productsData = useSelector((state) => state.products.data);

  const dipatch = useDispatch();
  const [name,setName]=useState("");
  const [date, setDate] = useState(new Date());
  const [productType,setProductType]=useState('');
  const [assignedAttributes,setAssignedAttributes]=useState([ ])

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    dipatch(getProdcut());

  }, [dipatch]);

  useEffect(() => {
  }, [productsData]);

  const handleFormChange = (i,e) => {
    let dataAttribute=[...assignedAttributes];
    dataAttribute[i]=e.target.value;
    setAssignedAttributes(dataAttribute);
  }

  const addFieldsAttribute = () => {
    let newAtt='';
    setAssignedAttributes([...assignedAttributes,newAtt]);
  }
  return (
    <div>
      <h1>Product</h1>
      <Button onClick={handleShow}>Add New Product </Button>
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
          
          productsData.length >1 ? productsData.map((product,i)=>(
           <div key={i}>
            <OneProduct {...product} />
            </div>
          )):<h1>nothing..</h1>
          
        }
        </Row>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product </Modal.Title>
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
                <FormControl
          type="text"
          placeholder="product Type"
          aria-label="text"
          value={productType}
          onChange={(e) => setProductType(e.target.value)}
          style={{margin:"10px"}}

        />
        {
          assignedAttributes.map((att,i)=>{
            return(
            <div    key={i}  >
            <FormControl
            type="text"
            name="name"
            placeholder={"attribute "+i}
            style={{margin:"10px"}}
            value={assignedAttributes}
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
            dipatch(CreatProdcuts({name:name,created_at:date,productType:productType,assignedAttributes:assignedAttributes}));
            handleClose(); setAssignedAttributes([]);setName("");setDate(new Date());setProductType("");
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

export default Product