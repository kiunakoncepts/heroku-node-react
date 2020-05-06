import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Link } from 'react-router-dom';
import axios from 'axios';
import TidalAPI from 'tidal-api-wrapper';


import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Spinner from 'react-bootstrap/Spinner';
import ListGroup from 'react-bootstrap/ListGroup';





export default function Artist() {

  let { id,tidal_id } = useParams();
  const [albums,setAlbums] = useState([]);
  const [songs,setSongs] = useState([]);

  const ARTIST = gql`
    {
      artist(id:"${id}" ) {
          name
          image
          bg_image
          id
          tidal_id
          bio
      }
    }
  `;

  const { loading, error, data } = useQuery(ARTIST);

  const tidal = new TidalAPI({
    countryCode: 'US',
    limit: 1000
  });
  
  useEffect(() => {
    tidal.getArtistAlbums(tidal_id)
      .then((albums) => {
        console.log(albums)
        setAlbums(albums);
      })
      .catch(err => console.log(err));
  },[]);

  useEffect(() => {
    tidal.getArtistTopTracks(tidal_id)
    .then((tracks) => {
      console.log(tracks)
      setSongs(tracks)
    })
    .catch(err => console.log(err))
  }, [])
  
  if (data) {
    console.log(data)    
  }

  if (loading) return <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner>;
  if (error) return <p>Error :(</p>;

  
  

  return <>
            <Jumbotron
              style={{
                backgroundImage: 'linear-gradient(rgba(250, 250, 250, 0.3), rgb(250, 250, 250)), url('+ data.artist.bg_image + ')', backgroundSize: 'cover'}} fluid>
                <Col className="my-5 py-5"></Col>
                <Col className="my-5 py-5"></Col>

            </Jumbotron>
            <Container>
              <Row>
                
                <Col xs={12} md={5} lg={3}>
                  <img style={{width:'100%' }} src={data.artist.image} />
                </Col>
                <Col>
                  <h2>{data.artist.name}</h2>
                  <p>{data.artist.bio ? data.artist.bio : 'Bio coming soon.'}</p>
                </Col>
              </Row>
            </Container>
            <Container>
              <Row>
                <Col>
                <hr></hr>
                </Col>
              </Row>
            </Container>
            <Container>
              <Row>
                <Col>
                <h3>Top Songs</h3>
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <ListGroup>
                    {songs.map((s) => (
                      <ListGroup.Item>
                        {s.title} (<a target="_blank" href={s.url}>Listen on Tidal</a>)
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Col>
              </Row>
            </Container>
            <Container>
              <Row>
                <Col>
                <h3>Other Albums by {data.artist.name}</h3>
                </Col>
              </Row>
              <Row>
                {albums.map((a) => (
                  <Col xs={12} md={6} lg={3}>
                  <img style={{width: '100%' }} src={'https://resources.tidal.com/images/' +a.cover.replace(/-/g,'/') + '/750x750.jpg'} />
                    <h5>{a.title}</h5>
                    <a target="_blank" href={a.url}>Listen on Tidal</a>
                  </Col>
                ))}
              </Row>
            </Container>
          </>
}
