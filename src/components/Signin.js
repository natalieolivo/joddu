import React, { useState, useEffect } from "react";
import { Redirect } from "@reach/router";
import InputStyle from "../styles/Input";
import config from "../config/index";

const AUTH_SIGNIN_ENDPOINT = config.AUTH_SIGNIN_ENDPOINT || "";
const AUTH_SIGNUP_ENDPOINT = config.AUTH_SIGNUP_ENDPOINT || "";

function Signin() {
  const [user, setUser] = useState([]);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [initialSignIn, setInitialSignIn] = useState(false);
  const [createAccountVisible, setCreateAccountVisible] = useState(false);
  const token =
    localStorage.getItem("ut") && JSON.parse(localStorage.getItem("ut")).token;

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
      .then(payload => {
        console.log(`Create Account`, payload);
        localStorage.setItem("ut", JSON.stringify(payload));
        setInitialSignIn(true);
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
        <button>Create Account</button>
        <p>
          Have an Account? Sign in <span onClick={onClick}>here.</span>
        </p>
      </form>
    );
  };

  const SigninView = () => {
    if (initialSignIn) {
      //TODO: Redirect to the last location visited?
      return <Redirect noThrow to={`/home/signedin/${user.firstName}`} />;
    } else if (isSignedIn) {
      return <Redirect noThrow to={`/home`} />;
    }

    if (createAccountVisible) {
      // return <CreateAccount key="createAccount" />;
      return CreateAccount(); // TODO: refactor to be able to reference as JSX
    } else {
      return (
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
          <label htmlFor="rememberMe">
            <InputStyle
              name="rememberMe"
              type="checkbox"
              value={user.rememberMe}
            />
            <span>Remember Me?</span>
          </label>
          <span onClick={onForgetPassword}>Forget password?</span>
          <button>signin</button>
          <section>
            <p>Or sign in with Facebook:</p>
            <button>Continue</button>
          </section>
          <p>
            Need an Account? Create one <span onClick={onClick}>here.</span>
          </p>
        </form>
      );
    }
  };

  return SigninView();
}

export default Signin;
