import * as React from "react";
import { NavLink } from "react-router-dom";
import { LoginForm } from "../../components/LoginForm";
import { StateContext } from "../../components/Store";

export function Home() {
  const state = React.useContext(StateContext);

  const message = state.user ? (
    <span>You made it! Now, what could the reward be?</span>
  ) : (
    <span>
      Something valuable is hidden here, <br />
      but the system is not cooperative&hellip;
    </span>
  );

  return (
    <>
      <h1>The Log In Challenge</h1>
      <LoginForm />

      {state.user ? (
        <div id="reward">
          <NavLink to="/secret">
            <button>Continue!</button>
          </NavLink>
        </div>
      ) : null}

      <div className="static-addon-outer">
        <span className="static-addon-inner">
          <h4 className="home-message">{message}</h4>
        </span>
      </div>
    </>
  );
}
