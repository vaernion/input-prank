import * as React from "react";
import { useHistory } from "react-router-dom";
import { User } from "../../classes/User";
import { DispatchContext, StateContext } from "../../components/Store";
import passwordsList from "../../data/passwords.json";
import { randomError } from "../../utils/utils";
import "./SignupForm.css";

export function SignupForm() {
  const state = React.useContext(StateContext);
  const dispatch = React.useContext(DispatchContext);
  const history = useHistory();

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [attempts, setAttempts] = React.useState(0);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setErrorMessage("");

    if (event.currentTarget.name === "username") {
      if (!User.isUsernameValid(event.currentTarget.value)) {
        setErrorMessage("username is too short");
      }

      setUsername(event.currentTarget.value);
    } else if (event.currentTarget.name === "password") {
      if (!User.isPasswordvalid(event.currentTarget.value)) {
        setErrorMessage("password is too short");
      }
      setPassword(event.currentTarget.value);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // normal validation
    if (!User.isUsernameValid(username) || !User.isPasswordvalid(password)) {
      setErrorMessage("username or password invalid");
      return;
    }
    if (state.users.find((e) => e.username === username)) {
      setErrorMessage("username taken");
      return;
    }

    // random shenanigans
    if (!attempts || Math.random() < 0.3) {
      setErrorMessage(randomError());
      setUsername("");
      setPassword("");
      setAttempts((a) => a + 1);
      return;
    }

    // TODO: add new shenanigans

    // user survived the signup trials
    dispatch({ type: "SIGNUP", payload: new User(username, password) });
    history.push("/");
  };

  // console.log("signup", state, "users", state.users);

  return (
    <>
      <form id="signup" onSubmit={handleSubmit}>
        <label htmlFor="username">username</label>
        <div className="signup-username">
          <input
            type="text"
            name="username"
            id="username"
            placeholder="username"
            value={username}
            onChange={handleChange}
            autoFocus
          />
        </div>
        <label htmlFor="password">password</label>
        <select
          name="password"
          id="password"
          placeholder="password"
          value={password}
          onChange={handleChange}
        >
          <option value=""></option>
          {passwordsList.map((e) => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </select>
        <button type="submit">Signup</button>
        <div>{errorMessage}</div>
      </form>
    </>
  );
}
