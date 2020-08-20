import * as React from "react";
import "./SignupForm.css";

export function SignupForm() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.name === "username") {
      setUsername(event.currentTarget.value);
    } else if (event.currentTarget.name === "password") {
      setPassword(event.currentTarget.value);
    }
  };

  return (
    <>
      <form id="signup">
        <label htmlFor="username">user</label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="username"
          value={username}
          onChange={handleChange}
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
        <button type="submit">Signup</button>
      </form>
    </>
  );
}
