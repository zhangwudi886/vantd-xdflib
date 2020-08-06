import { FC } from "react";
import { MenuProps } from "./menu";
import { MenuItemProps } from "./menuItem";
import { SubMenuProps } from "./subMenu";
export declare type ImenuComponent = FC<MenuProps> & {
    Item: FC<MenuItemProps>;
    SubMenu: FC<SubMenuProps>;
};
declare const TransMenu: ImenuComponent;
export default TransMenu;
