import React from "react";
import { render, fireEvent } from "@testing-library/react";

import Input, { BaseInputProps } from "./input";

const defaultProps: BaseInputProps = {
  placeholder: "test-input",
};
const disabledProps: BaseInputProps = {
  placeholder: "disabled-input",
  disabled: true,
};
const sizelgProps: BaseInputProps = {
  placeholder: "size-lg-input",
  size: "lg",
};
const sizesmProps: BaseInputProps = {
  placeholder: "size-sm-input",
  size: "sm",
};

const pendProps: BaseInputProps = {
  placeholder: "prepend-input",
  prepend: "http://",
  append: ".com",
};

const differentProps = () => (
  <div data-testid="differentInputWrapper">
    <Input {...sizelgProps} />
    <Input {...sizesmProps} />
  </div>
);

const differentPendProps = () => <Input {...pendProps} />;

describe("test Input Component", () => {
  it("should render the correct default Input", () => {
    const wrapper = render(<Input {...defaultProps} />);
    const testNode = wrapper.getByPlaceholderText(
      "test-input"
    ) as HTMLInputElement;
    expect(testNode).toBeInTheDocument();
    expect(testNode).toHaveClass("xdf-input-inner");
  });
  it("should render disabled Input on disabled property", () => {
    const wrapper = render(<Input {...disabledProps} />);
    const testNode = wrapper.getByPlaceholderText(
      "disabled-input"
    ) as HTMLInputElement;
    expect(testNode).toBeInTheDocument();
    expect(testNode.disabled).toBeTruthy();
  });
  it("should render different Input sizes on siez property", () => {
    const container = render(differentProps());
    const wrapper = container.getByTestId("differentInputWrapper");
    expect(wrapper.querySelectorAll(":scope > div").length).toEqual(2);
    const testNodelg = container.getByPlaceholderText(
      "size-lg-input"
    ) as HTMLInputElement;
    expect(testNodelg).toBeInTheDocument();
    expect(testNodelg.parentElement).toHaveClass("input-size-lg");
    const testNodesm = container.getByPlaceholderText(
      "size-sm-input"
    ) as HTMLInputElement;
    expect(testNodesm).toBeInTheDocument();
    expect(testNodesm.parentElement).toHaveClass("input-size-sm");
  });
  it("should render prepand and append element on prepand/append property", () => {
    const { queryByText, container } = render(differentPendProps());
    const testContainer = container.querySelector(".xdf-input-wrapper");
    expect(testContainer).toHaveClass(
      "input-group input-group-append input-group-prepend"
    );
    expect(queryByText("http://")).toBeInTheDocument();
    expect(queryByText(".com")).toBeInTheDocument();
  });
});
