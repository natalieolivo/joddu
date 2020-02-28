import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Redirect, navigate } from "@reach/router";

import ButtonStyle from "../styles/Button";
import FormBoxStyle from "../styles/Form";
import InputStyle from "../styles/Input";
import RadioStyle from "../styles/Radio";
import styled from "styled-components";

import config from "../config/index";
import SecondaryHeader from "../styles/SecondaryHeader";

const API_REGISTER_ENDPOINT = config.API_REGISTER_ENDPOINT || "";
const ut = localStorage.getItem("ut");
const token = ut && JSON.parse(ut).token;

const citySelectOptions = [
  { value: "bedfordStuyvesant", label: "Bedford Stuyvesant" },
  { value: "flatbush", label: "Flatbush" },
  { value: "clintonHill", label: "Clinton Hill" }
];

const specialtySelectOptions = [
  { value: "locs", label: "Locs" },
  { value: "braids", label: "Braids" },
  { value: "twists", label: "Twists" },
  { value: "barber cuts", label: "Barber Cuts" },
  { value: "crochet", label: "Crochet" }
];

let postData = {};

const RegisterFormBoxStyle = styled(FormBoxStyle)`
  form {
    max-width: min-content;
  }
`;

function StylistRegister(props) {
  const customStyles = {
    input: styles => ({ ...styles, borderRadius: 16 }),
    container: styles => ({ ...styles, maxWidth: "20rem" }),
    control: styles => ({
      ...styles,
      backgroundColor: `${props.theme}`
    })
  };

  const [stylist, setStylist] = useState([]);
  const [activeProfile, setActiveProfile] = useState(false);
  const [isSignedIn] = useState(typeof token === "string");

  useEffect(() => {
    if (!isSignedIn) {
      navigate(`/signin`);
    }
  }, [isSignedIn]);

  const handleFormSubmit = event => {
    event.preventDefault();

    fetch(API_REGISTER_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(stylist)
    })
      .then(response => response.json())
      .then(result => {
        setStylist(prevState => {
          return { ...prevState, ...result };
        });
        setActiveProfile(true);
      });
  };

  const setStylistInputData = event => {
    console.log(event);

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

  if (activeProfile === true) {
    return <Redirect noThrow to={`/stylists/profile/${stylist._id}`} />;
  } else {
    return (
      <RegisterFormBoxStyle>
        <form onSubmit={handleFormSubmit}>
          <SecondaryHeader>
            Register as a Snatched Hair Artist in 3 easy steps:
          </SecondaryHeader>
          <span>Step 1: Enter your personal information:</span>
          <label htmlFor="firstName">
            <InputStyle
              type="text"
              name="firstName"
              placeholder="first name"
              onChange={setStylistInputData}
              value={stylist.firstName || ""}
            />
          </label>
          <label htmlFor="lastName">
            <InputStyle
              type="text"
              name="lastName"
              placeholder="last name"
              onChange={setStylistInputData}
              value={stylist.lastName || ""}
            />
          </label>
          <label htmlFor="email">
            <InputStyle
              type="text"
              name="email"
              placeholder="email"
              onChange={setStylistInputData}
              value={stylist.email || ""}
            />
          </label>
          <label htmlFor="phone">
            <InputStyle
              type="text"
              name="phone"
              placeholder="phone number"
              onChange={setStylistInputData}
              value={stylist.phone || ""}
            />
          </label>
          <label htmlFor="zip">
            <InputStyle
              type="text"
              name="zip"
              placeholder="your home zip code"
              onChange={setStylistInputData}
              value={stylist.zip || ""}
            />
          </label>
          <label htmlFor="region">
            <span>
              Step 2: What cities would you like to set appointments in?
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
              <RadioStyle id="ownYes" name="ownCar" type="radio" value="yes" />
              Yes
            </label>
            <label htmlFor="ownNo">
              <RadioStyle id="ownNo" name="ownCar" type="radio" value="yes" />
              No
            </label>
          </section>
          <label htmlFor="socialmedia">
            <span>
              Please provide a link or instagram handle where we can see your
              work.
            </span>
            <InputStyle
              type="text"
              prefix="@"
              name="socialmedia"
              placeholder="Enter link here"
              onChange={setStylistInputData}
              value={stylist.socialmedia || ""}
            />
          </label>
          <ButtonStyle>Create my Stylist Profile</ButtonStyle>
        </form>
      </RegisterFormBoxStyle>
    );
  }
}

export default StylistRegister;
