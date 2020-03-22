import styled from "styled-components";

const FormBoxStyle = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  width: 30rem;
  font-size: 1.4rem;

  label {
    display: block;
    margin: 1.4rem 0;
    span {
      display: inline-block;
      line-height: 1.8rem;
      margin: 1rem 0;
    }
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export default FormBoxStyle;
