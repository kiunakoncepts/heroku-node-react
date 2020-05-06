import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav';


export default function Header() {
  
  return (
      <>
        <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">BakedinDFW</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/about">About</Nav.Link>
        </Nav>
      </Navbar>
      </>
  )
};
