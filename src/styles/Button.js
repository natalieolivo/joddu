import styled from "styled-components";

const Button = styled.button`
  background: ${props => props.theme.primaryBtn};
  margin: 0.4em 0.8em;
  font-size: 28px;
  padding: 0.6em;
  cursor: pointer;
  color: #fff;
  border-radius: 16px;
  border: none;
  outline: 0;
`;

export default Button;
