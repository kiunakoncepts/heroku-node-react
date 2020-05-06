import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export default function Footer() {
  
  return (
      <>
        <Container className="footer-section-1" fluid>
            <Row>
                <Container>
                    <Row>
                        <Col>
                        Footer
                        
                        </Col>
                    </Row>
                    </Container>
                </Row>
            </Container>
            <Container fluid className="footer-section-2">
                <Row>
                    <Container>
                    <Row>
                        <Col className="footer-section-2">
                        <span>2020 &copy; Baked in DFW</span>
                        </Col>
                    </Row>
                </Container>
            </Row>
        </Container>
      </>
  )
};
