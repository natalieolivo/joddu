import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "@reach/router";
import placeholderImg from "../images/silouttemohawkbraid.png";
import SecondaryHeader from "../styles/SecondaryHeader";
import config from "../config/index";

const ut = localStorage.getItem("ut");
const token = ut && JSON.parse(ut).token;

const API_STYLIST_ZIP_ENDPOINT = config.API_STYLIST_ZIP_ENDPOINT || "";

const GridHeader = styled.h3``;

const GridFilter = styled.section`
  display: flex;
  flex-flow: row;
`;

const GridFilterBlock = styled.div`
  border-radius: 5em;
  cursor: pointer;
`;

const FlexGridStyle = styled.section`
  display: flex;
  flex-direction: row;
  flex-flow: wrap;
  padding: 4rem;
`;

const GridBlock = styled.div`
  width: 180px;
  padding: 1rem;
  text-align: center;
  line-height: 1.6rem;
  a {
    text-decoration: none;
  }
`;

const GridWrapper = styled.div`
  background: #000;
  border: solid 1px #000;
  border-radius: 1rem;
  padding: 1rem;
  color: #fff;

  span {
    text-transform: capitalize;
    display: inline-block;
    margin-right: 0.4rem;
  }
`;

const GridImg = styled.img`
  border-radius: 16px;
  width: 100%;
`;

const ProfileListInfo = styled.ul`
  list-style: none;
  padding: 0;
`;

// const [filters] = useState([
//   {
//     label: "braided",
//     url: ""
//   },
//   {
//     label: "natural",
//     url: ""
//   }
// ]);

function Grid(props) {
  const [results, setSearchResults] = useState([]);

  useEffect(() => {
    if (props.zip) {
      fetch(`${API_STYLIST_ZIP_ENDPOINT}/${props.zip}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(json => {
          console.log(json);
          setSearchResults(json);
        });
    }
  }, [props.zip]);

  //if (token) {
  return (
    <>
      <SecondaryHeader>Natural Hair Artists in {props.zip}</SecondaryHeader>
      {/* <GridFilter>
          {filters.map((filter, index) => {
            return (
              <GridFilterBlock key={index} onClick={filterResults}>
                {filter.label}
              </GridFilterBlock>
            );
          })}
        </GridFilter> */}

      <FlexGridStyle>
        {results.map(({ firstName, lastName, _id, region, specialty }) => {
          return (
            <GridBlock>
              <Link to={`/stylists/profile/${_id}`}>
                <GridWrapper>
                  <GridImg alt="" src={placeholderImg} />

                  <span>{firstName}</span>
                  <span>{lastName}</span>
                  <ProfileListInfo>
                    {region.map(({ label }) => {
                      return <li>{label}</li>;
                    })}
                    {specialty.map(({ label }) => {
                      return <li>{label}</li>;
                    })}
                  </ProfileListInfo>
                </GridWrapper>
              </Link>
            </GridBlock>
          );
        })}
      </FlexGridStyle>
    </>
  );
  // } else {
  //   return <Redirect noThrow to="/signin" />;
  // }
  // const [styles, setStyles] = useState([
  //   {
  //     style_type: "locks",
  //     location: "jamaica, ny",
  //     zipcode: "11435",
  //     image: {
  //       src:
  //         "https://i.pinimg.com/236x/f0/6e/33/f06e33bbe7cec830ea26b95b61a9dbe0.jpg"
  //     },
  //     pricing: []
  //   },
  //   {
  //     style_type: "locks",
  //     location: "jamaica, ny",
  //     zipcode: "11435",
  //     image: {
  //       src:
  //         "https://i.pinimg.com/236x/78/17/fe/7817fe214f7fabaab1970c3eefddb533.jpg"
  //     },
  //     pricing: []
  //   },
  //   {
  //     style_type: "locks",
  //     location: "jamaica, ny",
  //     zipcode: "11435",
  //     image: {
  //       src:
  //         "https://i.pinimg.com/236x/5c/5e/8b/5c5e8bd39e0dac6f298d7fe6e17a0685.jpg"
  //     },
  //     pricing: []
  //   },
  //   {
  //     style_type: "locks",
  //     location: "jamaica, ny",
  //     zipcode: "11435",
  //     image: {
  //       src:
  //         "https://i.pinimg.com/236x/b6/3b/3a/b63b3a58f22b42537241414fbef74841.jpg"
  //     },
  //     pricing: []
  //   }
  // ]);
  // const filterResults = () => {
  //   setStyles([
  //     ...Object.assign(
  //       styles,
  //       styles.push({
  //         style_type: "test",
  //         image: {
  //           src:
  //             "https://i.pinimg.com/236x/b6/3b/3a/b63b3a58f22b42537241414fbef74841.jpg"
  //         }
  //       })
  //     )
  //   ]);
  //   console.log(styles);
  // };
}

export default Grid;
