import * as React from "react";
import { NavLink } from "react-router-dom";

export const MenuLink = ({
  path,
  name,
  exact,
  image,
}: {
  path: string;
  name: string;
  exact?: boolean;
  image?: string;
}) => (
  <NavLink
    className="menu-link"
    activeClassName="menu-link-active"
    to={path}
    exact={exact}
  >
    {image ? <img src={image} alt={name} /> : name}
  </NavLink>
);
