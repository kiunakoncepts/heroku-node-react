import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Link } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'


const ARTISTS = gql`
  {
    artists {
        name
        image
        id
        tidal_id
    }
  }
`;

export default function AllArtists() {
  const { loading, error, data } = useQuery(ARTISTS);

  if (data) console.log(data)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return <>
  
  <Container>
    <Row>
      <Col>
        <h3>All Artists</h3>
      </Col>
    </Row>
    <Row>
      
    { data.artists.map((a) => (
      <Col className="mb-3" xs={6} md={3} lg={2}>
    <div key={a.name} id="artist">
      <Card>
        <Card.Img variant="top" src={a.image ? a.image : 'https://i.ibb.co/4WVjP5f/avatar-placeholder-generic.jpg'} />
        <Card.Body>
          <Card.Text>{a.name}</Card.Text>
          <small><Link to={`/artist/${a.id}/${a.tidal_id}`}>View</Link></small>
        </Card.Body>
      </Card>
    </div></Col>
  )) }

    </Row>
  
  
  </Container></>

}