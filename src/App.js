import React, { useRef } from "react";
import Menu from "./components/Menu";
import "./App.css";
import styled from "styled-components";

// Components
import StylistRegister from "./components/StylistRegister";
import StylistProfile from "./components/StylistProfile";
import Search from "./components/Search";
import Signin from "./components/Signin";

import ThemeManager from "./components/themes/ThemeManager";

import { Router } from "@reach/router";

const Header = styled.header`
  display: block;
  width: 100%;
  border-bottom: solid 1px #ddd;
  margin-bottom: 0.8em;
`;

function App() {
  const appRef = useRef(null);

  return (
    <div className="App" ref={appRef}>
      <Header>
        <Menu ref={appRef} />
      </Header>
      <Router>
        <Search path="/home" />
        <Search path="/home/:isSignedIn/:name" />
        <StylistRegister path="/stylists/register" />
        <StylistProfile path="/stylists/profile/:profileId" />
        <Signin path="/signin" />

        <ThemeManager path="/setTheme/red" />
      </Router>
    </div>
  );
}

export default App;
