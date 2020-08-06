import React, { useContext } from "react";
import classNames from "classnames";
import { MenuContext } from "./menu";
var MenuItem = function (props) {
    var _a;
    var className = props.className, disabled = props.disabled, style = props.style, children = props.children, index = props.index;
    var context = useContext(MenuContext);
    var classes = classNames("xdf-menu-item", className, (_a = {},
        _a["menu-item-is-disabled"] = disabled,
        _a["menu-item-is-active"] = context.index === index,
        _a));
    var handleClick = function () {
        if (context.onSelect && !disabled && typeof index === "string") {
            context.onSelect(index);
        }
    };
    return (React.createElement("li", { className: classes, style: style, onClick: handleClick }, children));
};
MenuItem.defaultProps = {
    index: "0",
    disabled: false,
};
MenuItem.displayName = "MenuItem"; //eact内置的静态属性
export default MenuItem;
