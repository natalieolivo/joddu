import React, { useState } from "react";
import styled from "styled-components";
import MenuButton from "../svgs/MenuButton";
import { Link } from "@reach/router";

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

const CartButton = styled.section`
  margin: 0.9em 0.9em 0 auto;
`;

function Menu() {
  let [menuVisible, setMenuState] = useState(false);

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

  const setMenuDisplay = () => {
    setMenuState(!menuVisible);
  };

  return (
    <Nav>
      <MenuButton setMenuDisplay={setMenuDisplay} />
      {menuDisplay()}
      <Title>Hair Care App</Title>
      <CartButton>
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="30"
          height="30"
          viewBox="0 0 16 16"
        >
          <path
            fill="#000000"
            d="M6 14.5c0 0.828-0.672 1.5-1.5 1.5s-1.5-0.672-1.5-1.5c0-0.828 0.672-1.5 1.5-1.5s1.5 0.672 1.5 1.5z"
          ></path>
          <path
            fill="#000000"
            d="M16 14.5c0 0.828-0.672 1.5-1.5 1.5s-1.5-0.672-1.5-1.5c0-0.828 0.672-1.5 1.5-1.5s1.5 0.672 1.5 1.5z"
          ></path>
          <path
            fill="#000000"
            d="M16 8v-6h-12c0-0.552-0.448-1-1-1h-3v1h2l0.751 6.438c-0.458 0.367-0.751 0.93-0.751 1.562 0 1.105 0.895 2 2 2h12v-1h-12c-0.552 0-1-0.448-1-1 0-0.003 0-0.007 0-0.010l13-1.99z"
          ></path>
        </svg>
      </CartButton>
    </Nav>
  );
}

export default Menu;
