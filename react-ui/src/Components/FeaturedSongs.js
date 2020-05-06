import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Link } from 'react-router-dom';

import Carousel from 'react-bootstrap/Carousel';


const SONGS = gql`
  {
    songs {
        name
        artist {
            name
        }
    }
  }
`;

export default function FeaturedSongs() {
  const { loading, error, data } = useQuery(SONGS);

  if (data) console.log(data)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
        <Carousel indicators={true} interval={5000}>
  
            { data.songs.map((s) => ( 
        
                <Carousel.Item key={s._id}>
                    <img style={{width: '100%' }} src="https://images.squarespace-cdn.com/content/v1/56a8d67fe0327ccfbfa214b5/1476442354015-LH6VFW8MBMO3BJLXC66Y/ke17ZwdGBToddI8pDm48kE4pqb4WwWNy-Jx2XghwlygUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYy7Mythp_T-mtop-vrsUOmeInPi9iDjx9w8K4ZfjXt2djyWHZn2C6y3RPCkowpz32icWViB7nRthQRMRT4XqfhTH3bqxw7fF48mhrq5Ulr0Hg/background.jpg?format=2500w" />
                    <Carousel.Caption>
                      <h1>Featured Song</h1>
                      <h3>{s.name}</h3>
                      <p>{s.artist.name}</p>
                    </Carousel.Caption>
                </Carousel.Item>

               
               

            )) } 

        </Carousel>
    </>
  
  )
};
