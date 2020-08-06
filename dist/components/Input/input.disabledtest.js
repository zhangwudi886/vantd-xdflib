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
import React from "react";
import { render } from "@testing-library/react";
import Input from "./input";
var defaultProps = {
    placeholder: "test-input",
};
var disabledProps = {
    placeholder: "disabled-input",
    disabled: true,
};
var sizelgProps = {
    placeholder: "size-lg-input",
    size: "lg",
};
var sizesmProps = {
    placeholder: "size-sm-input",
    size: "sm",
};
var pendProps = {
    placeholder: "prepend-input",
    prepend: "http://",
    append: ".com",
};
var differentProps = function () { return (React.createElement("div", { "data-testid": "differentInputWrapper" },
    React.createElement(Input, __assign({}, sizelgProps)),
    React.createElement(Input, __assign({}, sizesmProps)))); };
var differentPendProps = function () { return React.createElement(Input, __assign({}, pendProps)); };
describe("test Input Component", function () {
    it("should render the correct default Input", function () {
        var wrapper = render(React.createElement(Input, __assign({}, defaultProps)));
        var testNode = wrapper.getByPlaceholderText("test-input");
        expect(testNode).toBeInTheDocument();
        expect(testNode).toHaveClass("xdf-input-inner");
    });
    it("should render disabled Input on disabled property", function () {
        var wrapper = render(React.createElement(Input, __assign({}, disabledProps)));
        var testNode = wrapper.getByPlaceholderText("disabled-input");
        expect(testNode).toBeInTheDocument();
        expect(testNode.disabled).toBeTruthy();
    });
    it("should render different Input sizes on siez property", function () {
        var container = render(differentProps());
        var wrapper = container.getByTestId("differentInputWrapper");
        expect(wrapper.querySelectorAll(":scope > div").length).toEqual(2);
        var testNodelg = container.getByPlaceholderText("size-lg-input");
        expect(testNodelg).toBeInTheDocument();
        expect(testNodelg.parentElement).toHaveClass("input-size-lg");
        var testNodesm = container.getByPlaceholderText("size-sm-input");
        expect(testNodesm).toBeInTheDocument();
        expect(testNodesm.parentElement).toHaveClass("input-size-sm");
    });
    it("should render prepand and append element on prepand/append property", function () {
        var _a = render(differentPendProps()), queryByText = _a.queryByText, container = _a.container;
        var testContainer = container.querySelector(".xdf-input-wrapper");
        expect(testContainer).toHaveClass("input-group input-group-append input-group-prepend");
        expect(queryByText("http://")).toBeInTheDocument();
        expect(queryByText(".com")).toBeInTheDocument();
    });
});
