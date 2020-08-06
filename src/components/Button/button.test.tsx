import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Button, { ButtonProps, ButtonSize, ButtonType } from "./button";
const defaultProps = {
  onClick: jest.fn(),
};
const testProps: ButtonProps = {
  btnType: "primary",
  size: "lg",
  className: "klass",
};
const linkProps: ButtonProps = {
  btnType: "link",
  size: "lg",
  className: "linkclass",
  href: "http://www.baidu.com",
};
const disabledProps: ButtonProps = {
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

describe("test Button Component", () => {
  it("should render the correct default button", () => {
    const wrapper = render(<Button {...defaultProps}>nice</Button>);
    const element = wrapper.getByText("nice") as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    // export(element?.innerHTML). //因为返回的element是个字符串，不知道会返回的是不是一个element元素，因此这里不能直接使用element
    expect(element?.tagName).toEqual("BUTTON");
    expect(element).toHaveClass("btn btn-default");
    fireEvent.click(element);
    expect(defaultProps.onClick).toHaveBeenCalled(); //表示这个方法被调用到
    expect(element.disabled).toBeFalsy(); //希望使用element.disabled,需要借助类型断言 ,默认disabled为false
  });
  it("should render the correct component based on different props", () => {
    const wrapper = render(<Button {...testProps}>nice</Button>);
    const element = wrapper.getByText("nice");
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass("btn btn-primary btn-lg klass");
  });
  it("should render a link when btnType equals link and href is provided", () => {
    const wrapper = render(<Button {...linkProps}>link</Button>);
    const element = wrapper.getByText("link");
    expect(element).toBeInTheDocument();
    expect(element?.tagName).toEqual("A"); //是否是这个标签，，大写
    expect(element).toHaveClass("btn btn-link btn-lg linkclass");
  });
  it("should render disabled button when disabled set to true", () => {
    const wrapper = render(<Button {...disabledProps}>disabled</Button>);
    const element = wrapper.getByText("disabled") as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element?.tagName).toEqual("BUTTON"); //是否是这个标签，，大写
    expect(element).toHaveClass("btn btn-danger btn-lg"); //希望使用element.disabled,需要借助类型断言
    expect(element.disabled).toBeTruthy(); //希望使用element.disabled,需要借助类型断言
    fireEvent.click(element);
    expect(disabledProps.onClick).not.toHaveBeenCalled();
  });
});
