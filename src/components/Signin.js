import React, { useState, useEffect } from "react";
import InputStyle from "../styles/InputStyle";

const AUTH_ENDPOINT = "";

function Signin() {
  const [user, setUser] = useState([]);
  const [createAccountVisible, setCreateAccountVisible] = useState(false);

  const onCreateAccount = event => {
    event.preventDefault();

    fetch(AUTH_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(response => response.json)
      .then(json => console.log(json));
  };

  const onSignIn = event => {
    event.preventDefault();

    fetch(AUTH_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(response => response.json)
      .then(json => console.log(json));
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
            value={user.firstName}
            onChange={onFieldChange}
            placeholder="First Name"
            autoFocus
          />
        </label>
        <label htmlFor="lastName">
          <InputStyle
            name="lastName"
            type="text"
            value={user.lastName}
            onChange={onFieldChange}
            placeholder="LastName"
          />
        </label>
        <label htmlFor="email">
          <InputStyle
            name="email"
            type="text"
            value={user.email}
            onChange={onFieldChange}
            placeholder="email"
          />
        </label>
        <label htmlFor="zipcode">
          <InputStyle
            name="zipcode"
            type="text"
            value={user.zipcode}
            onChange={onFieldChange}
            placeholder="zipcode"
          />
        </label>
        <label htmlFor="phone">
          <InputStyle
            name="phone"
            type="text"
            value={user.phone}
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
