import React, { useState, useEffect } from "react";
import { Redirect } from "@reach/router";

import FormBoxStyle from "../styles/Form";
import InputStyle from "../styles/Input";
import ButtonStyle from "../styles/Button";
import Error from "../components/Error";
import { HandlerLinkStyle } from "../styles/Link";

import config from "../config/index";

const AUTH_SIGNIN_ENDPOINT = config.AUTH_SIGNIN_ENDPOINT || "";
const AUTH_SIGNUP_ENDPOINT = config.AUTH_SIGNUP_ENDPOINT || "";

function Signin() {
  const [user, setUser] = useState([]);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [initialSignIn, setInitialSignIn] = useState(false);
  const [createAccountVisible, setCreateAccountVisible] = useState(false);
  const [error, setError] = useState({ message: "" });

  const ut = localStorage.getItem("ut");
  const token = ut && JSON.parse(ut).token;

  useEffect(() => {
    if (token) {
      setIsSignedIn(true);
    }
  }, [token]);

  const onCreateAccount = event => {
    event.preventDefault();

    fetch(AUTH_SIGNUP_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(response => response.json())
      .then(response => {
        console.log(`Create Account`, response, response.code);

        localStorage.setItem("ut", JSON.stringify(response));
        setInitialSignIn(true);
      })
      .catch(e => {
        console.error(e);

        setError({
          message: `${e.message}: ${AUTH_SIGNUP_ENDPOINT}`
        });
      });
  };

  const onSignIn = event => {
    event.preventDefault();

    fetch(AUTH_SIGNIN_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        email: user.email,
        password: user.password
      })
    })
      .then(response => response.json())
      .then(payload => {
        localStorage.setItem("ut", JSON.stringify(payload));
        setIsSignedIn(true);
      });
  };

  const onFieldChange = event => {
    if (!event || !event.target) return;

    let value = event.target.value;
    let name = event.target.name;

    setError({ message: "" });

    setUser(prevState => {
      const newState = { [name]: value };
      return { ...prevState, ...newState };
    });
  };

  const onClick = event => setCreateAccountVisible(!createAccountVisible);

  const onForgetPassword = event => {
    console.log(`forgot pass`, event);
  };

  const CreateAccount = () => {
    return (
      <FormBoxStyle>
        <Error error={error.message}></Error>
        {/* <pre>{JSON.parse(pl)}</pre> */}
        <form onSubmit={onCreateAccount}>
          <label htmlFor="firstName">
            <InputStyle
              name="firstName"
              type="text"
              value={user.firstName || ""}
              onChange={onFieldChange}
              placeholder="first name"
              autoFocus
            />
          </label>
          <label htmlFor="lastName">
            <InputStyle
              name="lastName"
              type="text"
              value={user.lastName || ""}
              onChange={onFieldChange}
              placeholder="last name"
            />
          </label>
          <label htmlFor="email">
            <InputStyle
              name="email"
              type="text"
              value={user.email || ""}
              onChange={onFieldChange}
              placeholder="email"
            />
          </label>
          <label htmlFor="email">
            <InputStyle
              name="password"
              type="password"
              value={user.password || ""}
              onChange={onFieldChange}
              placeholder="password"
            />
          </label>
          <label htmlFor="zip">
            <InputStyle
              name="zip"
              type="text"
              value={user.zip || ""}
              onChange={onFieldChange}
              placeholder="zipcode"
            />
          </label>
          <label htmlFor="phone">
            <InputStyle
              name="phone"
              type="text"
              value={user.phone || ""}
              onChange={onFieldChange}
              placeholder="phone number"
            />
          </label>
          <ButtonStyle>Create Account</ButtonStyle>
          <p>
            Have an Account? Sign in
            <HandlerLinkStyle onClick={onClick}>here.</HandlerLinkStyle>
          </p>
        </form>
      </FormBoxStyle>
    );
  };

  const SigninView = () => {
    if (initialSignIn) {
      return <Redirect noThrow to={`/home/signedin/${user.firstName}`} />;
    } else if (isSignedIn) {
      return <Redirect noThrow to={`/home`} />;
    }

    if (createAccountVisible) {
      // return <CreateAccount key="createAccount" />;
      return CreateAccount(); // TODO: refactor to be able to reference as JSX
    } else {
      return (
        <FormBoxStyle>
          <form onSubmit={onSignIn} key="signinForm">
            <label htmlFor="email">
              <InputStyle
                name="email"
                type="text"
                value={user.email || ""}
                onChange={onFieldChange}
                placeholder="Email"
              />
            </label>
            <label htmlFor="password">
              <InputStyle
                name="password"
                type="password"
                value={user.password || ""}
                onChange={onFieldChange}
                placeholder="Password"
              />
            </label>
            <HandlerLinkStyle onClick={onForgetPassword}>
              Forget password?
            </HandlerLinkStyle>
            <ButtonStyle>sign in</ButtonStyle>
            <p>
              Need an Account?
              <HandlerLinkStyle onClick={onClick}>Create one.</HandlerLinkStyle>
            </p>
          </form>
        </FormBoxStyle>
      );
    }
  };

  return SigninView();
}

export default Signin;
