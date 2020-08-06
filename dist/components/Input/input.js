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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from "react";
import classNames from "classnames";
import Icon from "../Icon/icon";
// ChangeEvent注意这个修改类型的方法
/**
 * Input 输入框 通过鼠标或键盘输入内容，是最基础的表单域的包装
 *
 * ```javascript
 * import {Input} from "xdf-uilib"
 * ```
 *
 * 支持HTMLInput的所有基本属性
 */
export var Input = function (props) {
    // 伪代码
    // 第一步 取出所有的属性
    var _a;
    var icon = props.icon, disabled = props.disabled, size = props.size, prepend = props.prepend, append = props.append, style = props.style, restProps = __rest(props, ["icon", "disabled", "size", "prepend", "append", "style"]);
    //   const [inputValue, setInputValue] = useState(value);
    // 第二部 根据属性计算className
    var classes = classNames("xdf-input-wrapper", (_a = {},
        _a["input-size-" + size] = size,
        _a["is-disabled"] = disabled,
        _a["input-group"] = prepend || append,
        _a["input-group-append"] = !!append,
        _a["input-group-prepend"] = !!prepend,
        _a));
    var fixControlledValue = function (value) {
        if (typeof value === "undefined" || value === null) {
            return "";
        }
        return value;
    };
    if ("value" in props) {
        delete restProps.defaultValue;
        // 如果初始值为null，则设置默认值。
        restProps.value = fixControlledValue(restProps.value);
    }
    return (
    // 第三部 是否添加一些特定的节点，icon prepend append
    React.createElement("div", { className: classes, style: style },
        prepend && React.createElement("div", { className: "xdf-input-group-prepend" }, prepend),
        icon && (React.createElement("div", { className: "icon-wrapper" },
            React.createElement(Icon, { icon: icon, title: "title-" + icon }))),
        React.createElement("input", __assign({ className: "xdf-input-inner", disabled: disabled }, restProps)),
        append && React.createElement("div", { className: "xdf-input-group-append" }, append)));
};
export default Input;
