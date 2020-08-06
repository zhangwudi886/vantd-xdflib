import React, { useContext } from "react";
import classNames from "classnames";
import { MenuContext, SelectCallBack } from "./menu";
export interface MenuItemProps {
  index?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { className, disabled, style, children, index } = props;
  const context = useContext(MenuContext);
  const classes = classNames("xdf-menu-item", className, {
    ["menu-item-is-disabled"]: disabled,
    ["menu-item-is-active"]: context.index === index,
  });
  const handleClick = () => {
    if (context.onSelect && !disabled && typeof index === "string") {
      context.onSelect(index);
    }
  };
  return (
    <li className={classes} style={style} onClick={handleClick}>
      {children}
    </li>
  );
};

MenuItem.defaultProps = {
  index: "0",
  disabled: false,
};
MenuItem.displayName = "MenuItem"; //eact内置的静态属性
export default MenuItem;
