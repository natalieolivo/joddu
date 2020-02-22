import React, { useState } from "react";
import styled from "styled-components";

const GridHeader = styled.header``;

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

function Grid() {
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

  return (
    <>
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

      <FlexGridStyle>
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
      </FlexGridStyle>
    </>
  );
}

export default Grid;
