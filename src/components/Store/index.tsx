import * as React from "react";
import { User } from "../../classes/User";

type State = {
  user: User | null;
  users: User[];
};
const initialState: State = {
  user: null,
  // user: new User("a", "a"),
  users: [],
};

type Action =
  | {
      type: "DROP_TABLES" | "LOGOUT";
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
    case "LOGOUT":
      return { ...state, user: null };
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
