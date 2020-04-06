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
import Grid from "./components/Grid";
import { Router, navigate } from "@reach/router";
import FormBoxStyle from "./styles/Form";
import Error from "./components/Error";
import config from "./config/index";

const AUTH_SIGNIN_ENDPOINT = config.AUTH_SIGNIN_ENDPOINT || "";
const AUTH_SIGNOUT_ENDPOINT = config.AUTH_SIGNOUT_ENDPOINT || "";
const ut = localStorage.getItem("ut");
const token = ut && JSON.parse(ut).token;

const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 1;
  width: 100%;
  border-bottom: solid 1px ${props => props.theme.headerBorder};
  margin-bottom: 1rem;
`;

const AppStyle = styled.div`
  font-family: "Josefin Sans", serif;
  background: ${props => props.theme.bg};
  box-sizing: border-box;
  min-height: 100vh;
  display: flex;
  flex-flow: column;
  font-size: calc(10px + 2vmin);
  color: #000;

  &.scroll-state-start svg {
    transform: ${props => props.theme.transform};
  }

  &.scroll-state-start nav {
    background: ${props => props.theme.navScrollBg};
    transition: all 300ms linear;
    span {
      padding-left: 4.4rem;
    }
  }
`;

function App() {
  const [activeTheme, setThemeState] = useState({});
  const [isSignedIn, setIsSignedIn] = useState(token ? true : false);

  const appRef = useRef(null);
  const onSignin = user => {
    fetch(AUTH_SIGNIN_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        mode: "no-cors"
      },
      body: JSON.stringify({
        email: user.email,
        password: user.password
      })
    })
      .then(response => response.json())
      .then(payload => {
        localStorage.setItem("ut", JSON.stringify(payload));
        setIsSignedIn(true);
      });
  };

  const onSignout = () => {
    fetch(AUTH_SIGNOUT_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        mode: "no-cors",
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(response => {
        setIsSignedIn(false);
        // remove stored token
        localStorage.clear();
        navigate(`/home/signedOut`);
      })
      .catch(e => {
        console.error(e);
      });
  };

  useEffect(() => {
    const element = appRef.current;

    const attachHeaderClass = e => {
      if (window.pageYOffset > 0) {
        element.classList.remove("scroll-state-end");
        element.classList.add("scroll-state-start");
      } else {
        element.classList.remove("scroll-state-start");
        element.classList.add("scroll-state-end");
      }
    };
    window.addEventListener("scroll", attachHeaderClass);
  }, []);

  const ThemeManager = () => {
    const customStyles = {
      container: styles => ({ ...styles, width: "20rem" })
    };

    const themeSelectOptions = [
      { value: "panAfrican", label: "Pan African" },
      { value: "neutral", label: "Neutral" }
    ];

    const onThemeChange = selectValue => {
      console.log(selectValue);
      setActiveTheme(selectValue);
      setThemeState(getActiveTheme);
    };

    return (
      <FormBoxStyle>
        <form>
          <label htmlFor="theme">
            <Select
              name="theme"
              options={themeSelectOptions}
              styles={customStyles}
              value={activeTheme.main}
              placeholder="Choose a theme"
              onChange={value => {
                if (!value) return;
                onThemeChange(value.value);
              }}
            ></Select>
          </label>
        </form>
      </FormBoxStyle>
    );
  };

  useEffect(() => {
    if (typeof getActiveTheme().main !== "string") {
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
          <Menu
            ref={appRef}
            theme={activeTheme}
            signout={onSignout}
            isSignedIn={isSignedIn}
          />
        </Header>
        <Router>
          <Search path="/" />
          <Search path="/home" />
          <Search path="/home/:signedOutAction" />
          <Search path="/home/:isSignedIn/:name" />
          <Grid path="/search/results/:zip" />
          <StylistRegister path="/stylists/register" />
          <StylistProfile path="/stylists/profile/:profileId" />
          <Signin path="/signin" signin={onSignin} />
          <Error path="/*" />
          <ThemeManager path="/themes" />
        </Router>
      </AppStyle>
    </ThemeProvider>
  );
}

export default App;
