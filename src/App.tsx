import React, { useState, useEffect, ChangeEvent } from "react";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Button, { ButtonType, ButtonSize } from "./components/Button/button";
import Menu, { MenuProps } from "./components/Menu/menu";
import MenuItem, { MenuItemProps } from "./components/Menu/menuItem";
import SubMenu from "./components/Menu/subMenu";
import Icon from "./components/Icon/icon";
import Input from "./components/Input/input";
import Upload from "./components/Upload/upload";

import Transition from "./components/Transition/transition";

library.add(fas);
function App1() {
  const [show, setShow] = useState(false);
  return (
    <div className="App">
      <header className="App-header">
        <Input placeholder="111" icon="search" style={{ width: "300px" }} />
        <Input icon="search" style={{ width: "300px" }} size="lg" />
        <Input icon="search" style={{ width: "300px" }} size="sm" />
        <Input style={{ width: "300px" }} append=".com" />
        <Input icon="search" style={{ width: "300px" }} prepend="https://" />

        <Icon icon="coffee" theme="success" size="10x" />
        <Menu
          defaultIndex={"0"}
          onSelect={(index) => {
            console.log(index);
          }}
          // mode="vertical"
          // defaultOpenSubMenus={["2", "3"]}
        >
          <MenuItem>menu item1</MenuItem>
          <MenuItem disabled>menu item2</MenuItem>
          <SubMenu title="dropdown">
            <MenuItem>submenu item1</MenuItem>
            <MenuItem>submenu item2</MenuItem>
          </SubMenu>
          <SubMenu title="dropdown1">
            <MenuItem>submenu item1</MenuItem>
            <MenuItem>submenu item2</MenuItem>
          </SubMenu>
          <MenuItem>menu item3</MenuItem>
        </Menu>
        <Button
          size="lg"
          onClick={() => {
            setShow(!show);
          }}
        >
          toggle
        </Button>
        <Transition in={show} animation={"zoom-in-left"} timeout={300}>
          <div>
            <div>11111111111111111111</div>
            <div>21111111111111111111</div>
            <div>31111111111111111111</div>
            <div>41111111111111111111</div>
            <div>51111111111111111111</div>
            <div>61111111111111111111</div>
            <div>71111111111111111111</div>
          </div>
        </Transition>
        <Transition in={show} animation={"zoom-in-right"} timeout={300} wrapper>
          <Button btnType="primary" size="lg">
            A large button
          </Button>
        </Transition>
      </header>
    </div>
  );
}

const App: React.FC = () => {
  const [title, setTitle] = useState("111111");
  const postData = {
    title: "my title",
    body: "hello man",
  };
  // useEffect(() => {
  //   axios
  //     .post("http://jsonplaceholder.typicode.com/posts", postData)
  //     .then((res) => {
  //       console.log(res);
  //       // setTitle(res.data[0].title);
  //     });
  // }, []);
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const uploadedFile = files[0];
      const formData = new FormData();
      formData.append(uploadedFile.name, uploadedFile);
      axios
        .post("http://jsonplaceholder.typicode.com/posts", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res);
          // setTitle(res.data[0].title);
        });
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>{title}</h1>
        {/* 如果要上传二进制的数12据，使用表单提交，都需要设置encType，还有text/plain application/x-www-form-urlencoded */}
        {/* <form
          method="post"
          encType="multipart/form-data"
          action="http://jsonplaceholder.typicode.com/posts"
        >
          <input type="file" name="file" />
          <button type="submit">submit</button>
        </form> */}
        <input type="file" name="file" onChange={handleFileChange} />
      </header>
    </div>
  );
};
export default App;
