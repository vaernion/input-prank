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

  const usernameRef = React.useRef<HTMLDivElement>(null);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  // sometimes remove a few characters from the username
  // can/should adjust values
  React.useEffect(() => {
    if (username.length > 3 && Math.random() < 0.3) {
      let arr = username.split("");

      for (let i = 0; i < 2; ++i) {
        arr.splice(Math.floor(Math.random() * arr.length), 1);
      }

      setUsername(arr.join(""));
    }
  }, [username]);

  // hack needed to clear value from first input
  // after username is set to "" by setUsername
  // possible cause: react reusing same element
  // this is best fix for now
  // alternative: leave the bug in place as a feature to annoy players
  React.useEffect(() => {
    if (usernameRef.current && username.length === 0) {
      // couldn't find another way to tell TS the type of the child
      (usernameRef.current.children[0] as HTMLInputElement).value = "";
    }
  }, [username]);

  const generateInputs = (count: number): JSX.Element[] => {
    const elements = [];

    for (let i = 0; i < count; i++) {
      let element = (
        <input
          key={i}
          className={username.length >= 1 ? "generated-input" : undefined}
          type="text"
          name="username"
          placeholder={username.length < 1 ? "username" : undefined}
          onChange={handleChange}
          // could leave autoFocus off to be annoying
          // autoFocus={i === count - 1}
          // either autofocus on and maxlength off or the opposite
          // if autofocus and maxlength are both off player can ignore new inputs
          // if both are enabled, user can also ignore the new inputs and keep typing
          maxLength={1}
        />
      );
      elements.push(element);
    }

    return elements;
  };

  const parseInputs = (inputs: Array<HTMLInputElement>): string => {
    let string = "";

    for (let child of inputs) {
      string += child.value;
    }

    return string;
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setErrorMessage("");

    if (event.currentTarget.name === "username") {
      let tempName = parseInputs(
        Array.from<any>(usernameRef.current!.children)
      );

      setUsername(tempName);

      if (!User.isUsernameValid(tempName)) {
        setErrorMessage("username is too short");
      }
    } else if (event.currentTarget.name === "password") {
      if (!User.isPasswordvalid(event.currentTarget.value)) {
        setErrorMessage("password is too short");
      }
      setPassword(event.currentTarget.value);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch({ type: "SIGNUP_ATTEMPT" });

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
    if (!state.signupAttempts || Math.random() < 0.3) {
      setErrorMessage(randomError());
      // reset username input element array instead
      setUsername("");
      setPassword("");
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
        <div className="signup-username" ref={usernameRef}>
          {generateInputs(username.length + 1)}
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
