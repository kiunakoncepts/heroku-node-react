import React, { useCallback, useEffect, useState } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'

import ApolloClient from 'apollo-boost';
import { gql } from "apollo-boost";
import { ApolloProvider } from '@apollo/react-hooks';

import { Alert } from 'react-bootstrap'

import './App.scss';

import AllArtists from './Components/AllArtists';
import Artist from './Components/Artist';
import FeaturedSongs from './Components/FeaturedSongs';
import FeaturedArtists from './Components/FeaturedArtist';
import Header from './Components/Header';
import Footer from './Components/Footer';
import About from './Components/About';

const App = () => {
  const client = new ApolloClient({
    uri: '/graphql',
  });

  return (
  <ApolloProvider client={client}>
    <Router>
      <div className="App">
      
        <Header />
        <Switch>
          <Route exact path="/">
            <FeaturedSongs />
            <AllArtists />
          </Route>
          <Route path="/artist/:id/:tidal_id">
            <Artist />
          </Route>
          <Route path="/about">
            <About />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  </ApolloProvider>
  )};

export default App;
