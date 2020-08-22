import * as React from "react";
import { User } from "../../classes/User";

type State = {
  user: User | null;
  users: User[];
  signupAttempts: number;
  loginAttempts: number;
  usedNames: string[];
  hasDroppedTable: boolean;
  hasRestoredTable: boolean;
  usersBackup: User[];
};
const initialState: State = {
  user: null,
  // user: new User("a", "a"),
  users: [],
  // users: [new User("a", "a")],
  signupAttempts: 0,
  loginAttempts: 0,
  usedNames: [],
  hasDroppedTable: false,
  // hasDroppedTable: true,
  hasRestoredTable: false,
  // hasRestoredTable: true,
  usersBackup: [],
  // usersBackup: [new User("a", "a")],
};

type Action =
  | {
      type:
        | "LOGOUT"
        | "SIGNUP_ATTEMPT"
        | "LOGIN_ATTEMPT"
        | "DROP_TABLES"
        | "RESTORE_BACKUP";
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
    case "SIGNUP":
      return { ...state, users: [...state.users, action.payload] };
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null, hasRestoredTable: false };
    case "SIGNUP_ATTEMPT":
      return { ...state, signupAttempts: state.signupAttempts + 1 };
    case "LOGIN_ATTEMPT":
      return { ...state, loginAttempts: state.loginAttempts + 1 };
    case "USERNAME_USED":
      return { ...state, usedNames: [...state.usedNames, action.payload] };
    case "DROP_TABLES":
      return {
        ...initialState,
        signupAttempts: state.signupAttempts,
        loginAttempts: state.loginAttempts,
        hasDroppedTable: true,
        usersBackup: state.users,
      };
    case "RESTORE_BACKUP":
      return {
        ...state,
        hasDroppedTable: false,
        hasRestoredTable: true,
        users: state.usersBackup,
        usersBackup: [],
      };
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
