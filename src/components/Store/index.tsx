import * as React from "react";
import { User } from "../../classes/User";

type State = {
  isLoggedIn: boolean;
  user: User;
  users: User[];
};
const initialState: State = {
  isLoggedIn: false,
  user: new User("dummy", "dummy"),
  users: [],
};

type Action =
  | {
      type: "DROP_TABLES";
    }
  | {
      type: "SIGNUP" | "LOGIN";
      payload: User;
    };

const storeReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "DROP_TABLES":
      return initialState;
    case "SIGNUP":
      return { ...state, users: [...state.users, action.payload] };
    case "LOGIN":
      return { ...state, user: action.payload };
  }
};

// separate contexts so components that
// only use dispatch won't re-render
type DispatchType = React.Dispatch<Action> | ((arg: any) => void);
export const DispatchContext = React.createContext<DispatchType>(() => {});
export const StateContext = React.createContext(initialState);

type Props = { children: React.ReactNode };

export default function Store(props: Props) {
  const [state, dispatch] = React.useReducer(storeReducer, initialState);

  return (
    <>
      <DispatchContext.Provider value={dispatch}>
        <StateContext.Provider value={state}>
          {props.children}
        </StateContext.Provider>
      </DispatchContext.Provider>
    </>
  );
}
