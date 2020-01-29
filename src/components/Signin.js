import React, { useState } from "react";

const onSignIn = event => {
  event.preventDefault();
};

const onCreateAccount = event => {
  event.preventDefault();
};

function Signin() {
  const [user, setUser] = useState([]);
  const [createAccountVisible, setCreateAccountVisible] = useState(false);

  const onChange = event => {
    setUser(event.target.value);
  };

  const onClick = event => setCreateAccountVisible(!createAccountVisible);

  const onForgetPassword = event => {
    console.log(`forgot pass`, event);
  };

  const CreateAccount = () => {
    return (
      <form onSubmit={onCreateAccount}>
        <label htmlFor="firstName">
          <input
            name="firstName"
            type="text"
            value={user.firstName}
            onChange={onChange}
            placeholder="First Name"
          />
        </label>
        <label htmlFor="lastName">
          <input
            name="lastName"
            type="text"
            value={user.lastName}
            onChange={onChange}
            placeholder="LastName"
          />
        </label>
        <label htmlFor="email">
          <input
            name="email"
            type="text"
            value={user.email}
            onChange={onChange}
            placeholder="email"
          />
        </label>
        <label htmlFor="zipcode">
          <input
            name="zipcode"
            type="text"
            value={user.zipcode}
            onChange={onChange}
            placeholder="zipcode"
          />
        </label>
        <label htmlFor="phone">
          <input
            name="phone"
            type="text"
            value={user.phone}
            onChange={onChange}
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
      return <CreateAccount />;
    } else {
      return (
        <form onSubmit={onSignIn}>
          <label htmlFor="email">
            <input
              name="email"
              type="text"
              value={user.email}
              onChange={onChange}
              placeholder="Email"
            />
          </label>
          <label htmlFor="password">
            <input
              name="password"
              type="text"
              value={user.password}
              onChange={onChange}
              placeholder="Password"
            />
          </label>
          <label htmlFor="rememberMe">
            <input name="rememberMe" type="checkbox" value={user.rememberMe} />
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

  return <SigninView />;
}

export default Signin;
