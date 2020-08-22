import * as React from "react";
import { User } from "../../classes/User";
import { difficulty } from "../../data/settings";
import { randomError } from "../../utils/randomError";
import { DispatchContext, StateContext } from "../Store";
import "./LoginForm.css";

export function LoginForm() {
  const state = React.useContext(StateContext);
  const dispatch = React.useContext(DispatchContext);

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [restoreAttempts, setRestoreAttempts] = React.useState(0);
  const [restoreButtonStyle, setRestoreButtonStyle] = React.useState<
    React.CSSProperties
  >({
    position: "relative",
    left: 0,
    top: 0,
  });

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

    // after normal validation so player can't win on first legit attempt
    dispatch({ type: "LOGIN_ATTEMPT" });

    // random shenanigans
    if (
      state.loginAttempts < difficulty.login.minAttempts ||
      Math.random() < difficulty.login.randomErrorChance
    ) {
      setUsername("");
      setPassword("");
      setErrorMessage(randomError());
      return;
    }

    // final obstacle
    if (!state.hasRestoredTable) {
      dispatch({ type: "DROP_TABLES" });
      setUsername("");
      setPassword("");
      setErrorMessage("DROP TABLE Users\nQuery completed.");
      return;
    }

    // user survived the login trials
    dispatch({ type: "LOGIN", payload: new User(username, password) });
  };

  const handleRestoreButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (
      restoreAttempts < difficulty.restoreTable.minAttempts ||
      Math.random() < difficulty.restoreTable.failureChance
    ) {
      const maxWidth = window.innerWidth * 0.8;
      const minWidth = window.innerWidth * 0.2;
      const maxHeight = window.innerHeight * 0.8;
      const minHeight = window.innerHeight * 0.2;
      // console.log("width", minWidth, maxWidth, "height", minHeight, maxHeight);
      setRestoreButtonStyle({
        position: "absolute",
        left: Math.random() * (maxWidth - minWidth) + minWidth,
        top: Math.random() * (maxHeight - minHeight) + minHeight,
      });
      setRestoreAttempts((a) => a + 1);
    } else {
      setErrorMessage("Backup restored!");
      dispatch({ type: "RESTORE_BACKUP" });
    }
  };

  // console.log("login", state, "users", state.users);

  return (
    <>
      <div className={state.hasRestoredTable ? "dancing-outer" : ""}>
        <form
          id="login"
          onSubmit={handleSubmit}
          className={state.hasRestoredTable ? "dancing-inner" : ""}
        >
          <label htmlFor="username">username</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="username"
            value={username}
            onChange={handleChange}
            autoFocus
            disabled={state.hasDroppedTable}
          />
          <label htmlFor="password">password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            value={password}
            onChange={handleChange}
            disabled={state.hasDroppedTable}
          />
          {state.hasDroppedTable ? (
            <button
              type="button"
              style={restoreButtonStyle}
              onClick={handleRestoreButton}
              // prevent users from tab selecting element and spamming space
              // at the cost of throwing accessability out the window
              // tabIndex={-1}
            >
              Restore backup
            </button>
          ) : (
            <button type="submit">Log in</button>
          )}

          <div className="errormessage">{errorMessage}</div>
        </form>
      </div>
    </>
  );
}
