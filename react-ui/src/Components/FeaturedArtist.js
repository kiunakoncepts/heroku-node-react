import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Link } from 'react-router-dom';
const ARTISTS = gql`
  {
    artists {
        name
        image
        id
    }
  }
`;

export default function FeaturedArtists() {
  const { loading, error, data } = useQuery(ARTISTS);

  if (data) console.log(data)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.artists.map((a) => (
    <div key={a.name} id="artist">
        <img src={ a.image } style={{ width: '100px', display: `${ a.image ? 'inline-block' : 'none' }` }} />
      <p>
        {a.name}
        <Link to={`/artist/${a.id}`}>View</Link>
      </p>
    </div>
  ));
}