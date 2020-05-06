import React, { useEffect, useState } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Spinner from 'react-bootstrap/Spinner';
import ListGroup from 'react-bootstrap/ListGroup';





export default function About() {

  return <>

            <Container>
              <Row>
                <Col>
                    <h2 className="my-5">About Baked in DFW</h2>
                </Col>
              </Row>
              <Row>
                <Col><hr/></Col>
                </Row>
            </Container>
            
            <Container>
              <Row>
                <Col>
                    <p>This web app is to aggrigate and compile all of the many different, talented artists in the DFW region. It integrates directly with Tidal so that each artist can get streams from it. Additionally, a Spotify link to the artist profile is included for users without a Tidal link.</p>

                    <p>This APP will be updated regulary, with future plans to develop an iOS version as well as an android APP.</p>

                    <p>If you are a DFW artists and would like to be listed here, contact us via our Facebook or Twitter page with links to some of your music and we will work to have you added.</p>

                    <p>For any other inquires, you can also send us a message on our social media platforms.</p>

                    <p>Please note that this is currenlty an non-profit project but if you would like to help in managing the content, please reachout to us via Facebook or Twitter.</p>

                    <p>We do not host any music or music files. To stream, you will need access to a Tidal or Spotify account. Additionally, we will also be slowly adding link to Soundcloud, Youtube etc.</p>
                </Col>
              </Row>
              <Row>
                <Col><hr className="my-5" /></Col>
                </Row>
            </Container>
          </>
}
