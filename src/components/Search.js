import React, { useState } from "react";
import styled from "styled-components";

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

const SearchInput = styled.input`
  height: 2em;
  margin: 0.4em;
  font-size: 28px;
  padding-left: 1.8em;
  border: solid 1px #ddd;
  outline: 0;
  background: #fff;
  border-radius: 16px;
  color: #888;
`;

const SearchBtn = styled.button`
  background: #450440;
  margin: 0.4em 0.8em;
  font-size: 28px;
  padding: 0.6em;
  cursor: pointer;
  background: #450440;
  color: #fff;
  border-radius: 16px;
  border: none;
  outline: 0;
`;

const SearchInputIcon = styled.svg`
  position: absolute;
  top: 25px;
  left: 25px;
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
    <div>
      <SignedInNotification />

      <span>Find and book a stylist:</span>

      <SearchInputWrapper>
        <SearchInput type="text" placeholder="11435" />
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
        <SearchBtn>search</SearchBtn>
      </SearchInputWrapper>
      <a href="/stylists/register">Register as a Stylist</a>

      <GridHeader>Hair Styles</GridHeader>
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
      </Grid>
    </div>
  );
}

export default Home;
