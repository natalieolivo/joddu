import React from "react";
import Menu from "./components/Menu";
import "./App.css";
import styled from "styled-components";
import StylistRegister from "./components/StylistRegister";
import StylistProfile from "./components/StylistProfile";
import Search from "./components/Search";
import Signin from "./components/Signin";

import { Router } from "@reach/router";

const Header = styled.header`
  display: block;
  width: 100%;
  border-bottom: solid 1px #ddd;
  margin-bottom: 0.8em;
`;

function App() {
  return (
    <div className="App">
      <Header>
        <Menu />
      </Header>
      <Router>
        <Search path="/home" />
        <StylistRegister path="/stylists/register" />
        <StylistProfile path="/stylists/profile/:profileId" />
        <Signin path="/signin" />
      </Router>
    </div>
  );
}

export default App;
