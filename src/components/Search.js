import React, { useState } from "react";
import styled from "styled-components";
import Button from "../styles/Button";
import InputStyle from "../styles/InputStyle";

// TODO: Need to make api request based on location for zip
//const DEV_API_ENDPOINT = "https://joddu-api.herokuapp.com/api/stylist";
//const LOCAL_API_ENDPOINT = "https://localhost:3001/api/stylist";
const GridHeader = styled.header``;

const GridFilter = styled.section`
  display: flex;
  flex-flow: row;
`;

const GridFilterBlock = styled.div`
  border-radius: 5em;
  cursor: pointer;
`;

const Grid = styled.section`
  display: flex;
  flex-direction: row;
  flex-flow: wrap;
`;

const GridBlock = styled.div`
  width: 180px;
  padding: 8px;
`;

const GridWrapper = styled.div``;

const GridImg = styled.img`
  border-radius: 16px;
  width: 100%;
`;

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

const SearchBoxStyle = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10rem 0;

  h3 {
    margin: 0.8em 0;
    text-align: center;
    font-size: 2rem;
  }

  a {
    color: #fff;
    text-transform: uppercase;
    text-decoration: none;
    text-align: center;
    font-size: 1rem;
  }

  button {
    margin: 1rem auto;
    font-size: 1.1rem;
    font-weight: 900;
  }
`;

function Home(props) {
  const SignedInNotification = () => {
    if (props.isSignedIn) {
      return <h1>{props.name}, you have successfully signed in!</h1>;
    }
    return null;
  };

  const [styles, setStyles] = useState([
    {
      style_type: "locks",
      location: "jamaica, ny",
      zipcode: "11435",
      image: {
        src:
          "https://i.pinimg.com/236x/f0/6e/33/f06e33bbe7cec830ea26b95b61a9dbe0.jpg"
      },
      pricing: []
    },
    {
      style_type: "locks",
      location: "jamaica, ny",
      zipcode: "11435",
      image: {
        src:
          "https://i.pinimg.com/236x/78/17/fe/7817fe214f7fabaab1970c3eefddb533.jpg"
      },
      pricing: []
    },
    {
      style_type: "locks",
      location: "jamaica, ny",
      zipcode: "11435",
      image: {
        src:
          "https://i.pinimg.com/236x/5c/5e/8b/5c5e8bd39e0dac6f298d7fe6e17a0685.jpg"
      },
      pricing: []
    },
    {
      style_type: "locks",
      location: "jamaica, ny",
      zipcode: "11435",
      image: {
        src:
          "https://i.pinimg.com/236x/b6/3b/3a/b63b3a58f22b42537241414fbef74841.jpg"
      },
      pricing: []
    }
  ]);

  const [filters] = useState([
    {
      label: "braided",
      url: ""
    },
    {
      label: "natural",
      url: ""
    }
  ]);

  const filterResults = () => {
    setStyles([
      ...Object.assign(
        styles,
        styles.push({
          style_type: "test",
          image: {
            src:
              "https://i.pinimg.com/236x/b6/3b/3a/b63b3a58f22b42537241414fbef74841.jpg"
          }
        })
      )
    ]);
    console.log(styles);
  };

  // useEffect(() => {
  //   fetch(DEV_API_ENDPOINT, {
  //     method: "POST",
  //     headers: {
  //       'Content-type': 'json'
  //     },
  //     body: styles
  //   })
  //     .then(response => response.json())
  //     .then(json => console.log(json));

  // }, [styles]);

  return (
    <SearchBoxStyle>
      <SignedInNotification />
      <h3>Hair Love, Anytime. Periodt.</h3>
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
      <a href="/stylists/register">Register as a Hair Artist</a>

      {/* <GridHeader>Hair Styles</GridHeader>
      <GridFilter>
        {filters.map((filter, index) => {
          return (
            <GridFilterBlock key={index} onClick={filterResults}>
              {filter.label}
            </GridFilterBlock>
          );
        })}
      </GridFilter>

      <Grid>
        {styles.map(({ style_type, image }) => {
          return (
            <GridBlock>
              <GridWrapper>
                <GridImg alt="" src={image.src} />
                {style_type}
              </GridWrapper>
            </GridBlock>
          );
        })}
      </Grid> */}
    </SearchBoxStyle>
  );
}

export default Home;
