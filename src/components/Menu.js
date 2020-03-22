import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "@reach/router";
import LogoGraphic from "./LogoGraphic";

const Nav = styled.nav`
  display: flex;
  background: ${props => props.theme.headerBg};
  font-size: 1em;
  justify-content: center;
  align-items: center;
  min-height: 3rem;

  svg {
    padding: 0.4rem;
    position: fixed;
    top: 0;
    left: 0;
  }
`;

Nav.defaultProps = {
  theme: {
    main: "neutral",
    bg: "brown"
  }
};

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

const Logo = styled.span`
  color: #000;
  font-size: 1.2rem;
  font-weight: 900;
  padding: 0.4rem 0 0 5.5rem;
`;

const HeaderLinkList = styled.section`
  margin: 0 0.9em 0 auto;
  cursor: pointer;

  span,
  a {
    color: #fff;
    text-transform: uppercase;
    text-decoration: none;
    font-size: 1rem;
  }
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

    if (!menuVisible) {
      ref.current.addEventListener("click", closeMenu);
    } else {
      ref.current.removeEventListener("click", closeMenu);
    }
  };

  const onSignout = () => {
    props.signout();
  };

  const HeaderLinks = () => {
    if (userInfo && userInfo.token) {
      return <span onClick={onSignout}>Sign Out ({userInfo.name})</span>;
    } else {
      return <Link to="/signin">Sign In</Link>;
    }
  };

  const LogoLabel = () => {
    if (props.theme.main === "panAfrican") {
      return <Logo>Snatched</Logo>;
    } else {
      return null;
    }
  };

  return (
    <Nav>
      {/* <MenuButton setMenuDisplay={setMenuDisplay} /> */}
      <Link to="/home">
        <LogoGraphic graphic={props} />
      </Link>
      {menuDisplay()}
      <LogoLabel />
      <HeaderLinkList>
        <HeaderLinks />
      </HeaderLinkList>
    </Nav>
  );
});

export default Menu;
