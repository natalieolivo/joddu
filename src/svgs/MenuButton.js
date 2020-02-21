import React from "react";
import styled from "styled-components";

const MenuBtn = styled.section`
  padding: 0.4em;
  height: 30px;
  border-radius: 40px;
  position: relative;

  &:hover {
    cursor: pointer;
    background: #eee;
  }

  &:active {
    background: #dfdddd;
  }
`;

function MenuButton(props) {
  return (
    <MenuBtn
      onClick={event => {
        props.setMenuDisplay(event);
      }}
    >
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width="30"
        height="30"
        viewBox="0 0 16 16"
      >
        <path
          fill="#000"
          d="M16 8c0-4.418-3.582-8-8-8s-8 3.582-8 8 3.582 8 8 8 8-3.582 8-8zM1.5 8c0-3.59 2.91-6.5 6.5-6.5s6.5 2.91 6.5 6.5-2.91 6.5-6.5 6.5-6.5-2.91-6.5-6.5z"
        ></path>
        <path
          fill="#000"
          d="M4.957 5.543l-1.414 1.414 4.457 4.457 4.457-4.457-1.414-1.414-3.043 3.043z"
        ></path>
      </svg>
    </MenuBtn>
  );
}

export default MenuButton;
