import * as React from "react";
import { User } from "../../classes/User";
import { randomError } from "../../utils/utils";
import { DispatchContext, StateContext } from "../Store";
import "./LoginForm.css";

export function LoginForm() {
  const state = React.useContext(StateContext);
  const dispatch = React.useContext(DispatchContext);

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage("");

    if (event.currentTarget.name === "username") {
      setUsername(event.currentTarget.value);
    } else if (event.currentTarget.name === "password") {
      setPassword(event.currentTarget.value);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch({ type: "LOGIN_ATTEMPT" });

    // normal validation
    if (
      !state.users.find(
        (e) => e.username === username && e.password === password
      )
    ) {
      setUsername("");
      setPassword("");
      setErrorMessage("Incorrect username or password");
      return;
    }

    // random shenanigans
    // TODO: decide if easier or harder than signup
    if (!state.loginAttempts || Math.random() < 0.6) {
      setErrorMessage(randomError());
      setUsername("");
      setPassword("");
      return;
    }

    // TODO: add new shenanigans

    // user survived the login trials
    dispatch({ type: "LOGIN", payload: new User(username, password) });
  };

  // console.log("login", state, "users", state.users);

  return (
    <>
      <form id="login" onSubmit={handleSubmit}>
        <label htmlFor="username">username</label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="username"
          value={username}
          onChange={handleChange}
          autoFocus
        />
        <label htmlFor="password">password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
          value={password}
          onChange={handleChange}
        />
        <button type="submit">Log in</button>
        <div>{errorMessage}</div>
      </form>
    </>
  );
}
