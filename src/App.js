import React, { useEffect, useState } from 'react';
import Menu from './components/Menu';
import './App.css';
import styled from 'styled-components';
import StylistsProfile from './components/StylistsProfile';
import Search from './components/Search';

import {
  BrowserRouter as Router,
  Switch,
  Route,  
} from 'react-router-dom';

const Header = styled.header`
  display: block;
  width: 100%;
  border-bottom: solid 1px #ddd;
  margin-bottom: .8em;
`;

function App() {
  return (
    <div className="App">
      <Router>
        <Header>
          <Menu />        
        </Header>
        <Switch>
          <Route path="/stylists/profile"><StylistsProfile /></Route>
          <Route path="/"><Search /></Route>
        </Switch>        
      </Router>
    </div>
  );
}

export default App;
