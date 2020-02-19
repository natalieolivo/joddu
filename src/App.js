import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import styled, { ThemeProvider } from "styled-components";
import config from "../src/config";

// Form Components
import Select from "react-select";

// Components
import Menu from "./components/Menu";
import StylistRegister from "./components/StylistRegister";
import StylistProfile from "./components/StylistProfile";
import Search from "./components/Search";
import Signin from "./components/Signin";
import { Router } from "@reach/router";

const ut = localStorage.getItem("ut");
const token = ut && JSON.parse(ut).token;
const id = ut && JSON.parse(ut).id;

const Header = styled.header`
  display: block;
  width: 100%;
  border-bottom: solid 1px #ddd;
  margin-bottom: 0.8em;
`;

// const theme = {
//   main: "panafrican",
//   bg: "#AA0F20",
//   primaryBtn: "#000"
// };

function App() {
  const appRef = useRef(null);
  // const [theme, setTheme] = useState({
  //   main: "panafrican",
  //   bg: "#AA0F20",
  //   primaryBtn: "#000"
  // });
  const [theme, setTheme] = useState({});

  const getTheme = themeKey => {
    const allThemes = {
      panAfrican: {
        main: "panafrican",
        bg: "#AA0F20",
        primaryBtn: "#000"
      },
      neutral: {
        main: "neutral",
        bg: "#45311F",
        primaryBtn: "#FF8E88"
      }
    };

    return allThemes[themeKey];
  };

  const ThemeManager = () => {
    const API_THEMES_ENDPOINT = config.API_THEMES_ENDPOINT;
    const themeSelectOptions = [
      { value: "panAfrican", label: "Pan African" },
      { value: "neutral", label: "Neutral" }
    ];

    const onThemeChange = selectValue => {
      const theme = { theme: selectValue };

      fetch(API_THEMES_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(theme)
      });

      setTheme(getTheme(selectValue));
    };

    return (
      <form>
        <label htmlFor="theme">
          <Select
            name="theme"
            isMulti={true}
            options={themeSelectOptions}
            value={theme}
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
    // get active theme
    fetch("http://localhost:3001/api/theme/5e4d60890b49abf7eaeb6e67", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(jsonResponse => {
        setTheme(getTheme(jsonResponse.theme));
      })
      .catch(e => {
        console.error(e);
      });
  }, []);

  return (
    <div className="App" ref={appRef}>
      <ThemeProvider theme={theme}>
        <Header>
          <Menu ref={appRef} />
        </Header>
        <Router>
          <Search path="/home" />
          <Search path="/home/:isSignedIn/:name" />
          <StylistRegister path="/stylists/register" />
          <StylistProfile path="/stylists/profile/:profileId" />
          <Signin path="/signin" />

          {/* Write styles for neutral and pan african theme */}
          {/* fetch, theme settings, set state for theme, pass theme via provider or context api */}
          {/* POST /theme - Add one theme */}
          {/* PUT /theme/:id - Edit one theme */}
          {/* GET /theme/:id - Get one theme */}

          <ThemeManager path="/themes" />
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
