import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <div>
        <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">Project</Navbar.Brand>
          <Nav className="me-auto">
          <Nav.Link as={Link} to="/add-product">Add-Product</Nav.Link>
          <Nav.Link as={Link} to="/view-item">View Item</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <br />  
    </div>
  )
}



