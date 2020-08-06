import React from "react";
import { addDecorator, addParameters } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import "../src/styles/index.scss";
library.add(fas);
const styles: React.CSSProperties = {
  textAlign: "left",
  padding: "20px 40px",
};

const CenterDecorator = (storyFn: any) => (
  <div style={styles}>
    <h3>组件演示</h3>
    {storyFn()}
  </div>
);
addDecorator(withInfo);

addDecorator(CenterDecorator);

addParameters({ info: { inline: true, header: false } });
