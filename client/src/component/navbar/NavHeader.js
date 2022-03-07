import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
function NavHeader() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Product Mangment</Navbar.Brand>
          <Nav className="d-flex">
            <Nav>
            <Link id="RouterNavLink" to='/' style={{ textDecoration: 'none' ,color:"#FFF",marginRight:12}}>Product Type</Link>
            </Nav>
            <Nav>
            <Link id="RouterNavLink" to='/prod' style={{ textDecoration: 'none' ,color:"#FFF",marginRight:12}}>Product</Link>
            </Nav>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavHeader;
