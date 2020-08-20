import * as React from "react";
import { MenuItem } from ".";
import { MenuLink } from "./MenuLink";

export function MenuParent({
  item,
  menuChildren,
}: {
  item: MenuItem;
  menuChildren?: MenuItem[];
}) {
  const [active, setActive] = React.useState(false);
  const alwaysShowChildren = false;

  const handleMouseEnter = () => {
    setActive(true);
  };

  const handleMouseLeave = () => {
    setActive(false);
  };

  return (
    <>
      <span
        key={item.name}
        className={`menu-item menu-item-${item.name}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="menu-parent">
          <MenuLink
            path={item.path}
            name={item.name}
            exact={item.exact}
            image={item.image}
          ></MenuLink>
        </div>

        {(alwaysShowChildren && menuChildren) || (active && menuChildren) ? (
          <div className={`menu-children`}>
            <ul>
              {menuChildren.map((child) => {
                return (
                  <li
                    key={child.path}
                    className={`menu-child ${
                      active ? "menu-child-active" : ""
                    }`}
                  >
                    <MenuLink
                      path={child.path}
                      name={child.name}
                      exact={child.exact}
                      image={child.image}
                    ></MenuLink>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}
      </span>
    </>
  );
}
