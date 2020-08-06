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
import { render, fireEvent } from "@testing-library/react";
import Button from "./button";
var defaultProps = {
    onClick: jest.fn(),
};
var testProps = {
    btnType: "primary",
    size: "lg",
    className: "klass",
};
var linkProps = {
    btnType: "link",
    size: "lg",
    className: "linkclass",
    href: "http://www.baidu.com",
};
var disabledProps = {
    btnType: "danger",
    size: "lg",
    disabled: true,
    onClick: jest.fn(),
};
// test("our first button test", () => {
//   const wrapper = render(<Button>nice</Button>);
//   const element = wrapper.queryByAltText("nice");
//   console.log(element);
//   expect(element).toBeInTheDocument();
// });
describe("test Button Component", function () {
    it("should render the correct default button", function () {
        var _a;
        var wrapper = render(React.createElement(Button, __assign({}, defaultProps), "nice"));
        var element = wrapper.getByText("nice");
        expect(element).toBeInTheDocument();
        // export(element?.innerHTML). //因为返回的element是个字符串，不知道会返回的是不是一个element元素，因此这里不能直接使用element
        expect((_a = element) === null || _a === void 0 ? void 0 : _a.tagName).toEqual("BUTTON");
        expect(element).toHaveClass("btn btn-default");
        fireEvent.click(element);
        expect(defaultProps.onClick).toHaveBeenCalled(); //表示这个方法被调用到
        expect(element.disabled).toBeFalsy(); //希望使用element.disabled,需要借助类型断言 ,默认disabled为false
    });
    it("should render the correct component based on different props", function () {
        var wrapper = render(React.createElement(Button, __assign({}, testProps), "nice"));
        var element = wrapper.getByText("nice");
        expect(element).toBeInTheDocument();
        expect(element).toHaveClass("btn btn-primary btn-lg klass");
    });
    it("should render a link when btnType equals link and href is provided", function () {
        var _a;
        var wrapper = render(React.createElement(Button, __assign({}, linkProps), "link"));
        var element = wrapper.getByText("link");
        expect(element).toBeInTheDocument();
        expect((_a = element) === null || _a === void 0 ? void 0 : _a.tagName).toEqual("A"); //是否是这个标签，，大写
        expect(element).toHaveClass("btn btn-link btn-lg linkclass");
    });
    it("should render disabled button when disabled set to true", function () {
        var _a;
        var wrapper = render(React.createElement(Button, __assign({}, disabledProps), "disabled"));
        var element = wrapper.getByText("disabled");
        expect(element).toBeInTheDocument();
        expect((_a = element) === null || _a === void 0 ? void 0 : _a.tagName).toEqual("BUTTON"); //是否是这个标签，，大写
        expect(element).toHaveClass("btn btn-danger btn-lg"); //希望使用element.disabled,需要借助类型断言
        expect(element.disabled).toBeTruthy(); //希望使用element.disabled,需要借助类型断言
        fireEvent.click(element);
        expect(disabledProps.onClick).not.toHaveBeenCalled();
    });
});
