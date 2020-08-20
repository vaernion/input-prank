import * as React from "react";
import { StateContext } from "../../components/Store";
import "./Secret.css";

export function Secret() {
  const state = React.useContext(StateContext);

  if (!state.user) {
    return (
      <>
        <div>
          <h1>You are not supposed to be here&hellip;</h1>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="secret-greetings">
        <h3>You made it!</h3>
        <p>
          You tried {state.signupAttempts} times to sign up and{" "}
          {state.loginAttempts} times to log in
        </p>
      </div>
      <div className="video-wrapper">
        <div className="youtube-embed">
          <iframe
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Rickroll"
          ></iframe>
        </div>
      </div>
    </>
  );
}
