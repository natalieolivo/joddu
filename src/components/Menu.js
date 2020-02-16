import React, { useState } from "react";
import styled from "styled-components";
import MenuButton from "../svgs/MenuButton";
import { Link } from "@reach/router";
import config from "../config";

const AUTH_SIGNOUT_ENDPOINT = config.AUTH_SIGNOUT_ENDPOINT || "";

const Nav = styled.nav`
  background: #d5c7dd;
  font-size: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const List = styled.section`
  margin: 0;
  padding: 0;
  position: absolute;
  z-index: 10;
  top: 4.5em;
  left: 0.4em;
  right: 0.4em;
  color: #000;
  background: #fff;
  border: solid 1px #ddd;
  border-radius: 8px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
`;

const ListItems = styled.ul`
  list-style: none;
`;

const Title = styled.h2`
  color: #000;
  font-family: Futura;
`;

const HeaderLinkList = styled.section`
  margin: 0.9em 0.9em 0 auto;
`;

const userInfo =
  localStorage.getItem("ut") && JSON.parse(localStorage.getItem("ut"));

const Menu = React.forwardRef((props, ref) => {
  console.log(ref);
  let [menuVisible, setMenuVisible] = useState(false);

  const menuDisplay = () => {
    if (menuVisible) {
      return (
        <List>
          <ListItems>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/stylists/register">Stylists Register</Link>
            </li>
            <li>
              <Link to="/appointments">Appointments</Link>
            </li>
            <li>
              <Link to="/signin">Signin</Link>
            </li>
          </ListItems>
        </List>
      );
    }
  };

  const setMenuDisplay = event => {
    setMenuVisible(!menuVisible);

    const closeMenu = event => {
      if (event.target.className !== "App") return;

      setMenuVisible(false);
    };

    console.log(event.target.className);

    if (!menuVisible) {
      console.log("menu visible", ref.current);
      ref.current.addEventListener("click", closeMenu);
    } else {
      console.log("menu hidden", ref.current);
      ref.current.removeEventListener("click", closeMenu);
    }
  };

  const onSignout = () => {
    // remove stored token
    localStorage.clear();

    // TODO: Add message indicating signout
    fetch(AUTH_SIGNOUT_ENDPOINT)
      .then(response => response.json())
      .then(json => console.log("logged out", json))
      .catch(e => {
        console.log(e);
      });
  };

  const HeaderLinks = () => {
    if (userInfo && userInfo.token) {
      return <span onClick={onSignout}>Sign Out ({userInfo.name})</span>;
    } else {
      return <Link to="/signin">Sign In</Link>;
    }
  };

  return (
    <Nav>
      <MenuButton setMenuDisplay={setMenuDisplay} />
      {menuDisplay()}
      <Title>Hair Care App</Title>
      <HeaderLinkList>
        <HeaderLinks />
      </HeaderLinkList>
    </Nav>
  );
});

export default Menu;
