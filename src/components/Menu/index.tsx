import * as React from "react";
import { useHistory } from "react-router-dom";
import { DispatchContext, StateContext } from "../Store";
import "./menu.css";
import { menuItems } from "./menuItems";
import { MenuParent } from "./MenuParent";

export type MenuItem = {
  path: string;
  name: string;
  exact?: boolean;
  image?: string;
  children?: MenuItem[];
};

export function Menu() {
  const state = React.useContext(StateContext);
  const dispatch = React.useContext(DispatchContext);
  const history = useHistory();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    history.push("/");
  };

  return (
    <>
      <div className="menu">
        {menuItems.map((item) => {
          return (
            <MenuParent
              key={item.path}
              item={item}
              menuChildren={item.children}
            />
          );
        })}
      </div>
      {state.user ? (
        <span className="logout menu-item">
          <header>{state.user.username}</header>
          <button onClick={handleLogout}>Logout</button>
        </span>
      ) : null}
    </>
  );
}
