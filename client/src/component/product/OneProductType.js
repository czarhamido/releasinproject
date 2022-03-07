import React, { useState } from 'react'
import { Button, Card, Col, Form, FormControl, Modal, } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { getProdcutsType,UpdateProdcutsType } from "../../redux/prodctTypeSlice";

function OneProductType(product) {
  const dipatch = useDispatch();
  const id=product._id;

  const [show, setShow] = useState(false);
  const [name,setName]=useState(product.name);
  const [attributes,setAttributes]=useState(product.attributes)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleFormChange = (i,e) => {
    let dataAttribute=[...attributes];
    dataAttribute[i]=e.target.value;
    setAttributes(dataAttribute);
  }


  return (
    
    <div>
          <Col style={{ marginTop: "20px" }}>
            <Card>
              <Card.Title >{product.name}</Card.Title>
              <Card.Text>
                <span>{product.created_at}</span>
                <br/>
                {product.attributes.map((att,i)=>(
                  <span key={i} style={{margin:"5px",background:"#CCC",}}>{att}</span>
                  ))}
              <br/>
                  <Button variant="success" style={{margin:'10px'}} onClick={handleShow}>Update</Button>

              </Card.Text>
            </Card>
          </Col>


          <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form >
        <FormControl
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e)=>{setName(e.target.value)}}
          style={{margin:"10px"}}

        />
            <FormControl
          type="text"
          aria-label="text"
          value={product.created_at}   
          readOnly
          style={{margin:"10px"}}
          
        />
        {
          product.attributes.map((att,i)=>{
            return(
            <div    key={i}  >
            <FormControl
            type="text"
            name="name"
            placeholder={"attribute "+i}
            style={{margin:"10px"}}
            defaultValue={att}
            onChange={e=>handleFormChange(i,e)}
            />
            </div>
            )
          })
        }
      </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>{
            console.log(attributes);
            const dt={
              id:id,
              name:name,
              created_at:product.created_at,
              attributes: [...attributes]
            }
            dipatch(UpdateProdcutsType(JSON.stringify(dt)));
            handleClose();
            dipatch(getProdcutsType());
            window.location.reload();
          }
          }>
            Save 
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default OneProductType