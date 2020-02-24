import styled from "styled-components";

const Button = styled.button`
  background: ${props => props.theme.primaryBtn};
  margin: 1rem auto;
  font-size: 1.1rem;
  font-weight: 900;
  text-transform: uppercase;
  padding: 0.6em;
  cursor: pointer;
  color: ${props => props.theme.color};
  border-radius: ${props => props.theme.borderRadius};
  border: ${props => props.theme.border};
  outline: 0;

  transition: background-color 150ms linear;

  &:hover {
    background: ${props => props.theme.primaryBtnHover};
  }

  &:active {
    background: #910717;
    border: solid 4px #910717;
  }
`;

export default Button;
