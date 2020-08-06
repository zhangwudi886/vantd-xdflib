import React from "react";
// import { linkTo } from "@storybook/addon-links";
// import { Welcome } from "@storybook/react/demo";
import { storiesOf } from "@storybook/react";
// export default {
//   title: "Welcome",
//   component: Welcome,
// };

// export const ToStorybook = () => <Welcome showApp={linkTo("Button")} />;

// ToStorybook.story = {
//   name: "to Storybook",
// };

storiesOf("xdf uilab", module).add(
  "welcome",
  () => {
    return (
      <>
        <h1>欢迎来到新东方ui组件库</h1>
        <code>npm install vantd-xdflib -S</code>
      </>
    );
  },
  {
    info: {
      disable: true,
    },
  }
);
