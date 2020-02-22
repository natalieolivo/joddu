import React from "react";
import styled from "styled-components";
import Button from "../styles/Button";
import InputStyle from "../styles/Input";
import LinkStyle from "../styles/Link";
import WomanWithCombImg from "../images/womanwithcomb.png";
import HowItWorksImg from "../images/howitworks.png";

const SearchInputWrapper = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const SearchInputIcon = styled.svg`
  position: absolute;
  top: 25px;
  left: 25px;
`;

const BoxStyle = styled.div`
  padding: 8rem 4rem 10rem;
  @media (max-width: 500px) {
    padding: 8rem 0;
  }
`;

const SearchBoxStyle = styled(BoxStyle)`
  display: flex;
  flex-direction: column;

  button {
    margin: 1rem auto;
    font-size: 1.1rem;
    font-weight: 900;
  }
`;

const SecondaryHeader = styled.h3`
  margin: 0.8em 0;
  text-align: center;
  font-size: 2rem;
`;

const FlexRightBoxStyle = styled(BoxStyle)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 2rem;
  background: #910717 url(${WomanWithCombImg}) no-repeat right 2rem;
  min-height: 40rem;
  padding: 10rem 4rem;
  p {
    color: #fff;
    padding: 0rem;
    line-height: 2rem;
  }
`;

const FlexLeftBoxStyle = styled(BoxStyle)`
  min-height: 40rem;
  background: #fff url(${HowItWorksImg}) no-repeat left 2rem;
  ol {
    margin-left: 33%;
  }
`;

function Home(props) {
  const SignedInNotification = () => {
    if (props.isSignedIn) {
      return <h1>{props.name}, you have successfully signed in!</h1>;
    }
    return null;
  };

  return (
    <>
      <SearchBoxStyle>
        <SignedInNotification />
        <SecondaryHeader>Hair Love, Anytime. Periodt.</SecondaryHeader>
        <SearchInputWrapper>
          <InputStyle type="text" placeholder="11435" />
          <SearchInputIcon
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="30"
            height="30"
            viewBox="0 0 16 16"
          >
            <path
              fill="#eee"
              d="M8 0c-2.761 0-5 2.239-5 5 0 5 5 11 5 11s5-6 5-11c0-2.761-2.239-5-5-5zM8 8.063c-1.691 0-3.063-1.371-3.063-3.063s1.371-3.063 3.063-3.063 3.063 1.371 3.063 3.063-1.371 3.063-3.063 3.063zM6.063 5c0-1.070 0.867-1.938 1.938-1.938s1.938 0.867 1.938 1.938c0 1.070-0.867 1.938-1.938 1.938s-1.938-0.867-1.938-1.938z"
            ></path>
          </SearchInputIcon>
          <Button>Find Artists Now</Button>
        </SearchInputWrapper>
        <LinkStyle to="/stylists/register">Register as a Hair Artist</LinkStyle>
      </SearchBoxStyle>
      <FlexRightBoxStyle>
        <SecondaryHeader>Natural Hair Artists on Demand</SecondaryHeader>
        <p>
          We get it. Managing hair care, self-love and everything in between can
          be a challenge. You want a hair care professional that understands
          your hair care needs and has a flexible schedule you can book on the
          go.
        </p>
      </FlexRightBoxStyle>
      <FlexLeftBoxStyle>
        <SecondaryHeader>How It Works.</SecondaryHeader>
        <ol>
          <li>
            Find an Artists in your area.
            <p>
              Our Hair Artists are screened and trained professionals who
              prioritize the health, beauty and style of your hair equally.
            </p>
          </li>
          <li>Book the Artist of your choice at the time of your choice.</li>
          <li>Get Ready To Look and Feel Great!</li>
        </ol>
      </FlexLeftBoxStyle>
    </>
  );
}

export default Home;
