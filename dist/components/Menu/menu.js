import React, { useState, createContext, cloneElement, Children, } from "react";
import classNames from "classnames";
export var MenuContext = createContext({
    index: "0",
});
var Menu = function (props) {
    var className = props.className, mode = props.mode, style = props.style, children = props.children, defaultIndex = props.defaultIndex, defaultOpenSubMenus = props.defaultOpenSubMenus, _a = props.onSelect, onSelect = _a === void 0 ? function () { } : _a;
    var _b = useState(defaultIndex), currentActive = _b[0], setActive = _b[1];
    var classes = classNames("xdf-menu", className, {
        "menu-vertical": mode === "vertical",
        "menu-horizontal": mode !== "vertical",
    });
    var handleClick = function (index) {
        setActive(index);
        onSelect(index);
    };
    var renderChildren = function () {
        return Children.map(children, function (child, index) {
            // 怎么拿到displayName的属性呢
            var childElement = child;
            var displayName = childElement.type.displayName;
            if (displayName === "MenuItem" || displayName === "SubMenu") {
                return cloneElement(childElement, {
                    index: index.toString(),
                });
            }
            else {
                console.error("Warning:Menu has a child which is not a MenuItem");
            }
        });
    };
    var passedContext = {
        index: currentActive ? currentActive : "0",
        onSelect: handleClick,
        mode: mode,
        defaultOpenSubMenus: defaultOpenSubMenus,
    };
    return (React.createElement("ul", { className: classes, style: style, "data-testid": "xdf-menu" },
        React.createElement(MenuContext.Provider, { value: passedContext }, renderChildren())));
};
Menu.defaultProps = {
    defaultIndex: "0",
    mode: "horizontal",
    // mode: "vertical",
    defaultOpenSubMenus: [],
};
export default Menu;
