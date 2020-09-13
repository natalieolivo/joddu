import React, { useState } from "react";
import Select from "react-select";
import { Redirect } from "@reach/router";
import useProfileCheck from "../hooks/use-profile-check";

import Notification from "../components/Notification";
import Error from "./ErrorNotification";

import styled from "styled-components";
import ButtonStyle from "../styles/Button";
import FormBoxStyle from "../styles/Form";
import InputStyle from "../styles/Input";
import RadioStyle from "../styles/Radio";
import { validateInput, hasErrors } from "../utils/validation";

import config from "../config/index";
import SecondaryHeader from "../styles/SecondaryHeader";

const API_REGISTER_ENDPOINT = config.API_REGISTER_ENDPOINT || "";
const API_SETTINGS_ENDPOINT = config.API_SETTINGS_ENDPOINT || "";
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

const ErrorNotification = notification => {
  console.log(notification);
  if (notification.errormsg !== "") {
    window.scrollTo(0, 0);
    return <Notification>{notification.errormsg}</Notification>;
  }
  return null;
};

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
  const [notif, setNotification] = useState("");

  const errorDefaults = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    zip: ""
  };

  const [error, setError] = useState(errorDefaults);

  const handleFormSubmit = event => {
    event.preventDefault();
    console.log(`handle form submit`);
    if (hasErrors(error)) {
      setNotification("Please correct the errors first.");
      return;
    }

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
        console.log("now feeettttchhh", result);
        fetch(API_SETTINGS_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ approved: false, _id: result._id })
        });
        // need to call settings endpoint here
        //setActiveProfile(true);
      });
  };

  const setStylistInputData = event => {
    let value = event.target ? event.target.value : "";
    let key = event.target ? event.target.name : "";

    postData[key] = value;

    setStylist(prevState => {
      return { ...prevState, ...postData };
    });

    // reset errors
    setError(prevState => {
      return { ...prevState, [key]: "" };
    });
    setNotification("");

    //set errors
    if (!validateInput(value, key)) {
      setError(prevState => {
        console.log(key);
        return {
          ...prevState,
          [key]:
            key === "email"
              ? "Whoops. Email is not valid."
              : "Please enter a value."
        };
      });
    }
  };

  const setStylistSelectData = (obj, attrs) => {
    let value = obj ? obj : [];
    let key = attrs.name ? attrs.name : "";

    postData[key] = value;

    setStylist(prevState => {
      return { ...prevState, ...postData };
    });
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

  const isUserWithProfile = useProfileCheck(stylist._id);

  if (isUserWithProfile) {
    return <Redirect noThrow to={`/stylists/profile/${stylist._id}`} />;
  } else {
    return (
      <>
        <ErrorNotification errormsg={notif} />
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
                placeholder="First Name"
                onChange={setStylistInputData}
                value={stylist.firstName || ""}
              />
              <Error error={error.firstName} />
            </label>
            <label htmlFor="lastName">
              <InputStyle
                type="text"
                name="lastName"
                placeholder="Last Name"
                onChange={setStylistInputData}
                value={stylist.lastName || ""}
              />
              <Error error={error.lastName} />
            </label>
            <label htmlFor="email">
              <InputStyle
                type="email"
                name="email"
                placeholder="Enter an email"
                onChange={setStylistInputData}
                value={stylist.email || ""}
              />
              <Error error={error.email} />
            </label>
            <label htmlFor="phone">
              <InputStyle
                type="text"
                name="phone"
                placeholder="Phone"
                onChange={setStylistInputData}
                value={stylist.phone || ""}
              />
              <Error error={error.phone} />
            </label>
            <label htmlFor="zip">
              <InputStyle
                type="text"
                name="zip"
                placeholder="Zip code"
                onChange={setStylistInputData}
                value={stylist.zip || ""}
              />
              <Error error={error.zip} />
            </label>
            <label htmlFor="region">
              <span>
                Step 2: What cities would you like to set appointments in?
              </span>
              <Region />
              <Error error={error.region} />
            </label>
            <label htmlFor="specialty">
              <span>Step 3: What hair styles do you specialize in?</span>
              <Specialty />
              <Error error={error.specialty} />
            </label>

            <section>
              Do you own a car?
              <label htmlFor="ownYes">
                <RadioStyle
                  id="ownYes"
                  name="ownCar"
                  type="radio"
                  value="yes"
                />
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
      </>
    );
  }
}

export default StylistRegister;
