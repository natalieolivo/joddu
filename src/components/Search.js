import React, { useState } from "react";
import styled from "styled-components";
import { Redirect } from "@reach/router";
import Error from "../components/Error";

import ButtonStyle from "../styles/Button";
import InputStyle from "../styles/Input";
import { LinkStyle } from "../styles/Link";
import SecondaryHeader from "../styles/SecondaryHeader";
import { validZip } from "../utils/validation";
import Notification from "../components/Notification";

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
    padding: 8rem 1rem 8rem;
  }
`;

const SearchBoxStyle = styled(BoxStyle)`
  display: flex;
  flex-direction: column;
`;

const FlexRightBoxStyle = styled(BoxStyle)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 2rem;
  background: #910717 url(${WomanWithCombImg}) no-repeat right 2rem;
  min-height: 40rem;

  p {
    color: #fff;
    margin: 0;
    line-height: 2rem;
  }

  @media (max-width: 500px) {
    padding-bottom: 0;
    h3 {
      margin-top: 4.2rem;
      text-align: left;
      padding-right: 6rem;
    }
    p {
      margin-top: 2rem;
      text-align: center;
      font-size: 1.2rem;
    }
    background-position: 155% 2rem;
  }
`;

const FlexLeftBoxStyle = styled(BoxStyle)`
  min-height: 40rem;
  background: #fff url(${HowItWorksImg}) no-repeat left 2rem;
  ol {
    margin-left: 33%;
  }
  @media (max-width: 500px) {
    padding-top: 4rem;
    background-position: 0 10rem;
    h3 {
      margin: 0;
    }
    ol {
      color: #fff;
      margin: 26rem 0 0;
      background: #000;
      padding: 3rem;
      position: absolute;
      left: 0;
      line-height: 2rem;
      background: #000;
    }
    p {
      margin: 1rem 0;
      font-size: 1rem;
      color: #769075;
    }
  }
`;

const SignedInNotification = props => {
  if (props.isSignedIn) {
    return (
      <Notification>
        {props.name}, you have successfully signed in!
      </Notification>
    );
  }
  return null;
};

function Search(props) {
  const [zip, setZip] = useState(null);
  const [activeSearch, setActiveSearch] = useState(false);
  const [error, setError] = useState({
    message: ""
  });

  const onFindArtists = event => {
    event.preventDefault();
    if (validZip(zip)) {
      setActiveSearch(true);
      setError({ message: "" });
    } else {
      setError({ message: "Enter a zip code value." });
    }
  };

  if (activeSearch) {
    return <Redirect noThrow to={`/search/results/${zip}`} />;
  } else {
    return (
      <>
        <SearchBoxStyle>
          <SignedInNotification
            isSignedIn={props.isSignedIn}
            name={props.name}
          />

          <form onSubmit={onFindArtists}>
            <SecondaryHeader>Hair Love, Anytime. Periodt.</SecondaryHeader>
            <SearchInputWrapper>
              <InputStyle
                type="text"
                onChange={event => {
                  setZip(event.target.value);
                  setError({ message: "" });
                }}
                value={zip || ""}
                placeholder="11435"
              />
              <Error error={error.message}></Error>
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
              <ButtonStyle onClick={onFindArtists}>
                Find Artists Now
              </ButtonStyle>
            </SearchInputWrapper>
          </form>
          <LinkStyle to="/stylists/register">
            Register as a Hair Artist
          </LinkStyle>
        </SearchBoxStyle>
        <FlexRightBoxStyle>
          <SecondaryHeader>Natural Hair Artists on Demand</SecondaryHeader>
          <p>
            We get it. Managing hair care, self-love and everything in between
            can be a challenge. You want a hair care professional that
            understands your hair care needs and has a flexible schedule you can
            book on the go.
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
            <li>
              Book the Artist of your choice at the time of your choice.
              <p>
                Our schedules are flexible and can be booked online. Check an
                artists calendar to confirm availability. They come to your
                place of business, home or salon near you. This allows you
                flexibility and on demand service.
              </p>
            </li>
            <li>
              Get Ready To Look and Feel Great!
              <p>
                Our service provides convenience for special occasions, or fine
                grain control over beauty rituals.
                <ButtonStyle>Book Now</ButtonStyle>
              </p>
            </li>
          </ol>
        </FlexLeftBoxStyle>
      </>
    );
  }
}

export default Search;
