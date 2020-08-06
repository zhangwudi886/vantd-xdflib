import React, {
  useState,
  createContext,
  FunctionComponentElement,
  cloneElement,
  Children,
} from "react";
import classNames from "classnames";
import { MenuItemProps } from "./menuItem";
type MenuMode = "horizontal" | "vertical";
export type SelectCallBack = (selectedIndex: string) => void;
export interface MenuProps {
  defaultIndex?: string;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: SelectCallBack;
  defaultOpenSubMenus?: string[];
}
interface IMenuContext {
  index: string;
  onSelect?: SelectCallBack;
  mode?: MenuMode;
  defaultOpenSubMenus?: string[];
}

export const MenuContext = createContext<IMenuContext>({
  index: "0",
});
const Menu: React.FC<MenuProps> = (props) => {
  const {
    className,
    mode,
    style,
    children,
    defaultIndex,
    defaultOpenSubMenus,
    onSelect = () => {},
  } = props;
  const [currentActive, setActive] = useState(defaultIndex);
  const classes = classNames("xdf-menu", className, {
    "menu-vertical": mode === "vertical",
    "menu-horizontal": mode !== "vertical",
  });
  const handleClick = (index: string) => {
    setActive(index);
    onSelect(index);
  };
  const renderChildren = () => {
    return Children.map(children, (child, index) => {
      // 怎么拿到displayName的属性呢
      const childElement = child as FunctionComponentElement<MenuItemProps>;
      const { displayName } = childElement.type;
      if (displayName === "MenuItem" || displayName === "SubMenu") {
        return cloneElement(childElement, {
          index: index.toString(),
        });
      } else {
        console.error("Warning:Menu has a child which is not a MenuItem");
      }
    });
  };
  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : "0",
    onSelect: handleClick,
    mode: mode,
    defaultOpenSubMenus: defaultOpenSubMenus,
  };
  return (
    <ul className={classes} style={style} data-testid="xdf-menu">
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  );
};
Menu.defaultProps = {
  defaultIndex: "0",
  mode: "horizontal",
  // mode: "vertical",
  defaultOpenSubMenus: [],
};
export default Menu;
