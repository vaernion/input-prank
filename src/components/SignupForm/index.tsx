import * as React from "react";
import { useHistory } from "react-router-dom";
import { User } from "../../classes/User";
import { DispatchContext, StateContext } from "../../components/Store";
import passwordsList from "../../data/passwords.json";
import { difficulty } from "../../data/settings";
import { randomError } from "../../utils/randomError";
import { shuffle } from "../../utils/shuffle";
import "./SignupForm.css";

export function SignupForm() {
  const state = React.useContext(StateContext);
  const dispatch = React.useContext(DispatchContext);
  const history = useHistory();

  const usernameRef = React.useRef<HTMLDivElement>(null);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const [shuffledList, setShuffledList] = React.useState(passwordsList);

  // shuffles the password list even while the select is open
  // seems to "just work" as hoped in both firefox and chrome
  React.useEffect(() => {
    const shuffleTimer = setTimeout(() => {
      setShuffledList(shuffle(passwordsList));
    }, difficulty.shuffleTimer);
    return () => {
      clearTimeout(shuffleTimer);
    };
  }, [shuffledList]);

  // sometimes remove a few characters from the username
  // can/should adjust values
  React.useEffect(() => {
    if (
      username.length > difficulty.nameSplicer.threshold &&
      Math.random() < difficulty.nameSplicer.chance
    ) {
      let arr = username.split("");
      for (let i = 0; i < difficulty.nameSplicer.count; ++i) {
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
      let mergedInputs = parseInputs(
        Array.from<any>(usernameRef.current!.children)
      );
      setUsername(mergedInputs);
      if (!User.isUsernameValid(mergedInputs)) {
        setErrorMessage("username is too short");
      }
    } else if (event.currentTarget.name === "password") {
      setPassword(event.currentTarget.value);
      if (!User.isPasswordvalid(event.currentTarget.value)) {
        setErrorMessage("password is too short");
      }
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // normal validation
    if (!User.isUsernameValid(username) || !User.isPasswordvalid(password)) {
      setErrorMessage("username or password invalid");
      return;
    }
    if (
      state.users.find((e) => e.username === username) ||
      state.usedNames.find((e) => e === username)
    ) {
      setErrorMessage("username taken");
      return;
    }

    // after normal validation so player can't win on first legit attempt
    dispatch({ type: "SIGNUP_ATTEMPT" });

    // ensure same name can't be spammed until it works
    dispatch({ type: "USERNAME_USED", payload: username });

    // random shenanigans
    if (
      state.signupAttempts < difficulty.signup.minAttempts ||
      Math.random() < difficulty.signup.randomErrorChance
    ) {
      setUsername("");
      setPassword("");
      setErrorMessage(randomError());
      return;
    }

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
          {shuffledList.map((e) => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </select>
        <button type="submit">Sign up</button>
      </form>
      <div className="static-addon-outer">
        <span className="static-addon-inner">{errorMessage}</span>
      </div>
    </>
  );
}
