import React, { useEffect, useState } from 'react';
import Menu from './components/Menu';
import './App.css';
import styled from 'styled-components';

const API_ENDPOINT = "";
const Header = styled.header`  
  display: block;
  width: 100%;
  border-bottom: solid 1px #ddd;
  margin-bottom: .8em;
`;

const GridHeader = styled.header`
  
`;

const GridFilter = styled.section`
    display: flex;
    flex-flow: row;    
`;

const GridFilterBlock = styled.div`
  border-radius: 5em;
`;

const Grid = styled.section`    
  display: flex;
  flex-direction: row;
  flex-flow: wrap;
`;

const GridBlock = styled.div`    
  width: 252px;
`;

const GridWrapper = styled.div`  
`;

const GridImg = styled.img`
  border-radius: 16px;
`;

const SearchInput = styled.input`
  width: 10em;
  height: 2em;
  margin: .8em;
  font-size: 28px;
  border: solid 1px #ddd;
  outline: 0;
`;

const SearchBtn = styled.button`
  width: 20em;
  font-size: 28px;
  padding: .6em;
  cursor: pointer;
  background: #ddd;
  border: none;
  outline: 0;
`;

// Calls api to return types of hair 
// sample schema above 
/* {
    type: "locks",
    location: "jamaica, ny",
    zipcode: "11435"
    image : []
    pricing: []
}, {
  type: braids,
  location: "jamaica, ny",
  zipcode: "11435",
  image: [],
  pricing: []
}
*/

function App() {
  const [styles] = useState([{
    style_type: "locks",
    location: "jamaica, ny",
    zipcode: "11435",
    image : {
      src: "https://i.pinimg.com/236x/f0/6e/33/f06e33bbe7cec830ea26b95b61a9dbe0.jpg"
    },
    pricing: []
  }, {
    style_type: "locks",
    location: "jamaica, ny",
    zipcode: "11435",
    image: {
      src: "https://i.pinimg.com/236x/78/17/fe/7817fe214f7fabaab1970c3eefddb533.jpg"
    },
    pricing: []
  }, {
    style_type: "locks",
    location: "jamaica, ny",
    zipcode: "11435",
    image: {
      src: "https://i.pinimg.com/236x/5c/5e/8b/5c5e8bd39e0dac6f298d7fe6e17a0685.jpg"
    },
    pricing: []
  }, {
    style_type: "locks",
    location: "jamaica, ny",
    zipcode: "11435",
    image: {
      src: "https://i.pinimg.com/236x/b6/3b/3a/b63b3a58f22b42537241414fbef74841.jpg"
    },
    pricing: []
  }]);

  const [filters] = useState([{
    label: "braided",
    url: ""
  }, {
    label: "natural",
    url: ""
  }]);

  useEffect(() => {
  
    // fetch(API_ENDPOINT)
    //   .then(response => response.json())
    //   .then(json => console.log(json));
  
  }, []);
  
  return (
    <div className="App">
      <Header>
        <Menu />
      </Header>

      <span>Find and book a stylist:</span>
      <SearchInput type="text" />
      <SearchBtn>search</SearchBtn>
      <a href="">Stylists click here</a>

      <GridHeader>Hair Styles</GridHeader>
      <GridFilter>
        {
          filters.map(filter => {
            return <GridFilterBlock>{filter.label}</GridFilterBlock>
          })
        }
      </GridFilter>

      <Grid>
        {styles.map(({type, image}) => {      
          return (
            <GridBlock>
              <GridWrapper>
                <GridImg alt="" src={image.src} />
                {type}
              </GridWrapper>
            </GridBlock>
          )
        })}
      </Grid>
    </div>
  );
}

export default App;
