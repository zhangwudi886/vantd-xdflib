import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Input from "./input";

const ControlledInput = () => {
  const [value, setValue] = useState();
  return (
    <Input
      value={value}
      defaultValue={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
    />
  );
};

const defaultInput = () => {
  return (
    <>
      <Input
        style={{ width: "300px" }}
        placeholder="placeholder"
        onChange={action("input changeed")}
      />
      <ControlledInput />
    </>
  );
};
const disabledInput = () => (
  <Input
    style={{ width: "300px" }}
    placeholder="disabled placeholder"
    disabled
  />
);

const iconInput = () => (
  <Input
    style={{ width: "300px" }}
    placeholder="icon placeholder"
    icon="search"
  />
);
const sizeInput = () => (
  <>
    <Input style={{ width: "300px" }} placeholder="lg placeholder" size="lg" />
    <Input style={{ width: "300px" }} placeholder="sm placeholder" size="sm" />
  </>
);
const prependInput = () => (
  <>
    <Input
      style={{ width: "300px" }}
      placeholder="prepend placeholder"
      prepend="https://"
    />
    <Input
      style={{ width: "300px" }}
      placeholder="prepend placeholder"
      append=".com"
    />
  </>
);
storiesOf("Input Component", module)
  .add("Input", defaultInput)
  .add("被禁用的Input", disabledInput)
  .add("带图标的Input", iconInput)
  .add("大小不同的Input", sizeInput)
  .add("带前后缀的Input", prependInput);
