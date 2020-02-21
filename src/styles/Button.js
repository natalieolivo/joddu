import styled from "styled-components";

const Button = styled.button`
  background: ${props => props.theme.primaryBtn};
  margin: 1rem 0;
  text-transform: uppercase;
  font-size: 28px;
  padding: 0.6em;
  cursor: pointer;
  color: ${props => props.theme.color};
  font-weight: 700;
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
