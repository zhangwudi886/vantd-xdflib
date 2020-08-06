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
import React, { useState, useEffect, useRef, } from "react";
import classNames from "classnames";
import Input from "../Input/input";
import Icon from "../Icon/icon";
import useDebounce from "../../hooks/useDebounce";
import useClickOutSide from "../../hooks/useClickOutSide";
export var AutoComplete = function (props) {
    var fetchSuggestions = props.fetchSuggestions, onSelect = props.onSelect, renderOptions = props.renderOptions, value = props.value, restProps = __rest(props, ["fetchSuggestions", "onSelect", "renderOptions", "value"]);
    var _a = useState(value), inputValue = _a[0], setInputValue = _a[1];
    var _b = useState(-1), highlightIndex = _b[0], setHighlightIndex = _b[1];
    var debounceValue = useDebounce(inputValue, 1000);
    var _c = useState([]), suggestions = _c[0], setSuggestions = _c[1];
    var triggerSearch = useRef(false);
    var componentef = useRef(null);
    useClickOutSide(componentef, function () {
        setSuggestions([]);
    });
    console.log("suggestions", suggestions);
    var _d = useState(false), loading = _d[0], setLoading = _d[1];
    useEffect(function () {
        if (debounceValue && triggerSearch.current) {
            var results = fetchSuggestions(debounceValue);
            if (results instanceof Promise) {
                setLoading(true);
                results.then(function (data) {
                    setSuggestions(data);
                    setLoading(false);
                });
            }
            else {
                setSuggestions(results);
            }
        }
        else {
            setSuggestions([]);
        }
        setHighlightIndex(-1);
    }, [debounceValue]);
    var highlight = function (index) {
        if (index < 0) {
            index = 9;
        }
        if (index >= suggestions.length) {
            index = suggestions.length - 1;
        }
        setHighlightIndex(index);
    };
    console.log(highlightIndex);
    var handleKeyDown = function (e) {
        console.log(e.keyCode);
        switch (e.keyCode) {
            case 13:
                if (suggestions[highlightIndex]) {
                    handleSelect(suggestions[highlightIndex]);
                }
                break;
            case 27:
                setSuggestions([]);
                break;
            case 38:
                highlight(highlightIndex - 1);
                break;
            case 40:
                highlight(highlightIndex + 1);
                break;
            default:
                break;
        }
    };
    var handleChange = function (e) {
        triggerSearch.current = true;
        var value = e.target.value.trim();
        setInputValue(value);
    };
    var handleSelect = function (item) {
        triggerSearch.current = false;
        setInputValue(item.value);
        setSuggestions([]);
        if (onSelect) {
            onSelect(item);
        }
    };
    var renderTemplate = function (item) {
        return renderOptions ? renderOptions(item) : item.value;
    };
    var generateDropdown = function () {
        return (React.createElement("ul", null, suggestions.map(function (item, index) {
            var highClassName = classNames("suggestion-item", {
                "item-highlighted": index === highlightIndex,
            });
            return (React.createElement("li", { className: highClassName, key: index, onClick: function () {
                    handleSelect(item);
                } }, renderTemplate(item)));
        })));
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "xdf-auto-complete", ref: componentef },
            React.createElement(Input, __assign({ onChange: handleChange, value: inputValue }, restProps, { onKeyDown: handleKeyDown })),
            loading && (React.createElement("ul", null,
                React.createElement(Icon, { icon: "spinner", spin: true }))),
            suggestions.length > 0 && generateDropdown())));
};
export default AutoComplete;
