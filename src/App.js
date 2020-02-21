import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import styled, { ThemeProvider } from "styled-components";
import { getActiveTheme, setActiveTheme } from "./utils/utils";

// Form Components
import Select from "react-select";

// Components
import Menu from "./components/Menu";
import StylistRegister from "./components/StylistRegister";
import StylistProfile from "./components/StylistProfile";
import Search from "./components/Search";
import Signin from "./components/Signin";
import { Router } from "@reach/router";

const Header = styled.header`
  position: sticky;
  top: 0;
  width: 100%;
  border-bottom: solid 1px #979797;
  margin-bottom: 1rem;
`;

const AppStyle = styled.div`
  width: 100%;
  font-family: "Josefin Sans", serif;
  background: ${props => props.theme.bg};
  box-sizing: border-box;
  min-height: 100vh;
  display: flex;
  flex-flow: column;
  font-size: calc(10px + 2vmin);
  color: #000;
`;

function App() {
  const [activeTheme, setThemeState] = useState({});
  const appRef = useRef(null);

  const ThemeManager = () => {
    // const API_THEMES_ENDPOINT = config.API_THEMES_ENDPOINT;
    const themeSelectOptions = [
      { value: "panAfrican", label: "Pan African" },
      { value: "neutral", label: "Neutral" }
    ];

    const onThemeChange = selectValue => {
      setActiveTheme(selectValue);
      setThemeState(getActiveTheme);
    };

    return (
      <form>
        <label htmlFor="theme">
          <Select
            name="theme"
            isMulti={true}
            options={themeSelectOptions}
            value={activeTheme}
            placeholder="Enter new theme"
            onChange={value => {
              console.log(value[1].value);
              onThemeChange(value[1].value);
            }}
          ></Select>
        </label>
      </form>
    );
  };

  useEffect(() => {
    if (typeof getActiveTheme().main !== "string") {
      // if not set, default theme after first render
      setActiveTheme("panAfrican");
      setThemeState(getActiveTheme());
    } else {
      setThemeState(getActiveTheme());
    }
  }, []);

  return (
    <ThemeProvider theme={activeTheme}>
      <AppStyle className="App" ref={appRef}>
        <Header>
          <Menu ref={appRef} />
        </Header>
        <Router>
          <Search path="/home" />
          <Search path="/home/:isSignedIn/:name" />
          <StylistRegister path="/stylists/register" />
          <StylistProfile path="/stylists/profile/:profileId" />
          <Signin path="/signin" />
          <ThemeManager path="/themes" />
        </Router>
      </AppStyle>
    </ThemeProvider>
  );
}

export default App;
