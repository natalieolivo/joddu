import React from "react";
import styled from "styled-components";

const NotificationStyle = styled.div`
  background: #b3c8a0;
  padding: 2rem;
  border: solid 1px #000;
  border-radius: 1rem;
`;

const Notification = props => {
  return (
    <NotificationStyle>
      <h3>{props.children}</h3>
    </NotificationStyle>
  );
};

export default Notification;
