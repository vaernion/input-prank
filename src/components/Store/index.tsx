import * as React from "react";
import { User } from "../../classes/User";

type State = {
  user: User | null;
  users: User[];
  signupAttempts: number;
  loginAttempts: number;
  usedNames: string[];
};
const initialState: State = {
  user: null,
  // user: new User("a", "a"),
  users: [],
  // users: [new User("a", "a")],
  signupAttempts: 0,
  loginAttempts: 0,
  usedNames: [],
};

type Action =
  | {
      type: "DROP_TABLES" | "LOGOUT" | "SIGNUP_ATTEMPT" | "LOGIN_ATTEMPT";
    }
  | {
      type: "SIGNUP" | "LOGIN";
      payload: User;
    }
  | {
      type: "USERNAME_USED";
      payload: string;
    };

const storeReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "DROP_TABLES":
      return initialState;
    case "SIGNUP":
      return { ...state, users: [...state.users, action.payload] };
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    case "SIGNUP_ATTEMPT":
      return { ...state, signupAttempts: state.signupAttempts + 1 };
    case "LOGIN_ATTEMPT":
      return { ...state, loginAttempts: state.loginAttempts + 1 };
    case "USERNAME_USED":
      return { ...state, usedNames: [...state.usedNames, action.payload] };
  }
};

// separate contexts so components that
// only use dispatch won't re-render
type DispatchType = React.Dispatch<Action> | ((arg: any) => void);
export const DispatchContext = React.createContext<DispatchType>(() => {});
export const StateContext = React.createContext(initialState);

export default function Store({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = React.useReducer(storeReducer, initialState);

  return (
    <>
      <DispatchContext.Provider value={dispatch}>
        <StateContext.Provider value={state}>{children}</StateContext.Provider>
      </DispatchContext.Provider>
    </>
  );
}
