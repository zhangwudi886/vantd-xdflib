var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { useState, useContext, cloneElement, Children, } from "react";
import classNames from "classnames";
import { MenuContext } from "./menu";
import Icon from "../Icon/icon";
import Transition from "../Transition/transition";
var SubMenu = function (props) {
    var context = useContext(MenuContext);
    var index = props.index, title = props.title, className = props.className, children = props.children;
    var openedSubMenu = context.defaultOpenSubMenus;
    var isOpend = index && context.mode === "vertical"
        ? openedSubMenu.includes(index)
        : false;
    var _a = useState(isOpend), menuOpen = _a[0], setMenuOpen = _a[1];
    var classes = classNames("xdf-menu-item xdf-menu-submenu", className, {
        "is-active": context.index === index,
        "is-opened": menuOpen,
        "is-vertical": context.mode === "vertical",
    });
    var handleClick = function (e) {
        e.stopPropagation();
        setMenuOpen(!menuOpen);
    };
    var timer;
    var clickEvents = context.mode === "vertical"
        ? {
            onClick: handleClick,
        }
        : {};
    var hoverEvents = context.mode !== "vertical"
        ? {
            onMouseEnter: function (e) {
                handleMouse(e, true);
            },
            onMouseLeave: function (e) {
                handleMouse(e, false);
            },
        }
        : {};
    var handleMouse = function (e, toggle) {
        clearTimeout(timer);
        e.preventDefault();
        timer = setTimeout(function () {
            setMenuOpen(toggle);
        }, 300);
    };
    var renderChildren = function () {
        var subMenuClasses = classNames("xdf-submenu", {
            "menu-opened": menuOpen,
        });
        var childrenComponent = Children.map(children, function (child, curIndex) {
            var childElement = child;
            if (childElement.type.displayName === "MenuItem") {
                return cloneElement(childElement, {
                    index: index + "-" + curIndex,
                });
            }
            else {
                console.error("Warning:Submenu has a child which is not a MenuItem");
            }
        });
        return (React.createElement(Transition, { in: menuOpen, timeout: 300, animation: "zoom-in-bottom" },
            React.createElement("ul", { className: subMenuClasses }, childrenComponent)));
    };
    return (React.createElement("li", __assign({ key: index, className: classes }, hoverEvents),
        React.createElement("div", __assign({ className: "submenu-title" }, clickEvents),
            title,
            React.createElement(Icon, { icon: "angle-down", className: "angle-down" })),
        renderChildren()));
};
SubMenu.displayName = "SubMenu";
export default SubMenu;
