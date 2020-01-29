import React, { useState } from "react";
import styled from "styled-components";
import Select from "react-select";
import { Redirect } from "@reach/router";

const LOCAL_API_ENDPOINT = "http://localhost:3001/api/stylist";
//const DEV_API_ENDPOINT = "https://joddu-api.herokuapp.com/api/stylist";

const citySelectOptions = [
  { value: "brooklyn", label: "Brooklyn" },
  { value: "queens", label: "Queens" },
  { value: "manhattan", label: "Manhattan" }
];

const specialtySelectOptions = [
  { value: "locs", label: "Locs" },
  { value: "weave", label: "Weave" },
  { value: "crochet", label: "Crochet" }
];

const Input = styled.input`
  height: 2em;
  margin: 0.4em;
  font-size: 28px;
  padding-left: 1.8em;
  border: solid 1px #ddd;
  outline: 0;
  background: #fff;
  border-radius: 16px;
  color: #888;
  display: block;
`;

const customStyles = {
  input: styles => ({ ...styles, borderRadius: 16 })
};

let postData = {};

function StylistRegister(props) {
  const [stylist, setStylist] = useState([]);
  const [toStylistProfile, setToStylistProfile] = useState(false);

  const handleFormSubmit = event => {
    event.preventDefault();

    fetch(LOCAL_API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(stylist)
    })
      .then(response => response.json())
      .then(result => {
        setStylist(prevState => {
          return { ...prevState, ...result };
        });
        setToStylistProfile(true);
      });
  };

  const setStylistInputData = (event, attrs) => {
    console.log(event);
    console.log(attrs);

    let value = event.target ? event.target.value : "";
    let key = event.target ? event.target.name : "";

    postData[key] = value;

    setStylist(prevState => {
      return { ...prevState, ...postData };
    });

    console.log("state", stylist);
    console.log("post data", postData);
  };

  const setStylistSelectData = (obj, attrs) => {
    console.log(obj);
    console.log(attrs);

    let value = obj ? obj : [];
    let key = attrs.name ? attrs.name : "";

    postData[key] = value;

    setStylist(prevState => {
      return { ...prevState, ...postData };
    });

    console.log("state", stylist);
    console.log("post data", postData);
  };

  const Region = () => (
    <Select
      name="region"
      options={citySelectOptions}
      isMulti={true}
      styles={customStyles}
      value={stylist.region}
      onChange={value => {
        setStylistSelectData(value, { name: "region" });
      }}
    />
  );

  const Specialty = () => (
    <Select
      name="specialty"
      options={specialtySelectOptions}
      isMulti={true}
      styles={customStyles}
      value={stylist.specialty}
      onChange={value => setStylistSelectData(value, { name: "specialty" })}
    />
  );

  if (toStylistProfile === true) {
    //return <pre>{JSON.stringify(stylist)}</pre>;
    return <Redirect noThrow to={`/stylists/profile/${stylist._id}`} />;
  } else {
    return (
      <div>
        <form onSubmit={handleFormSubmit}>
          <h5>Register as a Snatched Stylist in 3 easy steps:</h5>
          <span>Step 1: Enter your personal information</span>
          <label htmlFor="firstName">
            <Input
              type="text"
              name="firstName"
              placeholder="first name"
              onChange={setStylistInputData}
              value={stylist.firstName || ""}
            />
          </label>
          <label htmlFor="lastName">
            <Input
              type="text"
              name="lastName"
              placeholder="last name"
              onChange={setStylistInputData}
              value={stylist.lastName || ""}
            />
          </label>
          <label htmlFor="email">
            <Input
              type="text"
              name="email"
              placeholder="email"
              onChange={setStylistInputData}
              value={stylist.email || ""}
            />
          </label>
          <label htmlFor="phone">
            <Input
              type="text"
              name="phone"
              placeholder="phone number"
              onChange={setStylistInputData}
              value={stylist.email || ""}
            />
          </label>
          <label htmlFor="zip">
            <Input
              type="text"
              name="zip"
              placeholder="your home zip code"
              onChange={setStylistInputData}
              value={stylist.zip || ""}
            />
          </label>
          <label htmlFor="region">
            <span>
              Step 2: What metro areas would you like to set appointments in?
            </span>
            <Region />
          </label>
          <label htmlFor="specialty">
            <span>Step 3: What hair styles do you specialize in?</span>
            <Specialty />
          </label>

          <section>
            Do you own a car?
            <label htmlFor="ownYes">
              <Input id="ownYes" name="ownCar" type="radio" value="yes" />
              Yes
            </label>
            <label htmlFor="ownNo">
              <Input id="ownNo" name="ownCar" type="radio" value="yes" />
              No
            </label>
          </section>
          <label htmlFor="socialmedialink">
            Please provide a link or instagram handle where we can see your
            work.
            <Input
              type="text"
              name="socialmedia"
              placeholder="Enter link here"
              onChange={setStylistInputData}
              value={stylist.link || ""}
            />
          </label>
          <button>Create my Stylist Profile</button>
        </form>
      </div>
    );
  }
}

export default StylistRegister;
