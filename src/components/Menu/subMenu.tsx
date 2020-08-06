import React, {
  useState,
  useContext,
  FunctionComponentElement,
  cloneElement,
  Children,
  useEffect,
} from "react";
import classNames from "classnames";
import { MenuContext } from "./menu";
import { MenuItemProps } from "./menuItem";

import Icon from "../Icon/icon";

import { CSSTransition } from "react-transition-group";

import Transition from "../Transition/transition";
export interface SubMenuProps {
  index?: string;
  title: string;
  className?: string;
}

const SubMenu: React.FC<SubMenuProps> = (props) => {
  const context = useContext(MenuContext);
  const { index, title, className, children } = props;

  let openedSubMenu = context.defaultOpenSubMenus as Array<string>;
  const isOpend =
    index && context.mode === "vertical"
      ? openedSubMenu.includes(index)
      : false;

  const [menuOpen, setMenuOpen] = useState(isOpend);
  const classes = classNames("xdf-menu-item xdf-menu-submenu", className, {
    "is-active": context.index === index,
    "is-opened": menuOpen,
    "is-vertical": context.mode === "vertical",
  });
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuOpen(!menuOpen);
  };
  let timer: any;
  const clickEvents =
    context.mode === "vertical"
      ? {
          onClick: handleClick,
        }
      : {};
  const hoverEvents =
    context.mode !== "vertical"
      ? {
          onMouseEnter: (e: React.MouseEvent) => {
            handleMouse(e, true);
          },
          onMouseLeave: (e: React.MouseEvent) => {
            handleMouse(e, false);
          },
        }
      : {};
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer);
    e.preventDefault();
    timer = setTimeout(() => {
      setMenuOpen(toggle);
    }, 300);
  };
  const renderChildren = () => {
    const subMenuClasses = classNames("xdf-submenu", {
      "menu-opened": menuOpen,
    });
    const childrenComponent = Children.map(children, (child, curIndex) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>;
      if (childElement.type.displayName === "MenuItem") {
        return cloneElement(childElement, {
          index: `${index}-${curIndex}`,
        });
      } else {
        console.error("Warning:Submenu has a child which is not a MenuItem");
      }
    });
    return (
      <Transition in={menuOpen} timeout={300} animation="zoom-in-bottom">
        <ul className={subMenuClasses}>{childrenComponent}</ul>
      </Transition>
    );
  };
  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className="submenu-title" {...clickEvents}>
        {title}
        <Icon icon="angle-down" className="angle-down" />
      </div>
      {renderChildren()}
    </li>
  );
};
SubMenu.displayName = "SubMenu";
export default SubMenu;
