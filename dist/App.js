import React, { useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Button from "./components/Button/button";
import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItem";
import SubMenu from "./components/Menu/subMenu";
import Icon from "./components/Icon/icon";
import Input from "./components/Input/input";
import Transition from "./components/Transition/transition";
library.add(fas);
function App1() {
    var _a = useState(false), show = _a[0], setShow = _a[1];
    return (React.createElement("div", { className: "App" },
        React.createElement("header", { className: "App-header" },
            React.createElement(Input, { placeholder: "111", icon: "search", style: { width: "300px" } }),
            React.createElement(Input, { icon: "search", style: { width: "300px" }, size: "lg" }),
            React.createElement(Input, { icon: "search", style: { width: "300px" }, size: "sm" }),
            React.createElement(Input, { style: { width: "300px" }, append: ".com" }),
            React.createElement(Input, { icon: "search", style: { width: "300px" }, prepend: "https://" }),
            React.createElement(Icon, { icon: "coffee", theme: "success", size: "10x" }),
            React.createElement(Menu, { defaultIndex: "0", onSelect: function (index) {
                    console.log(index);
                } },
                React.createElement(MenuItem, null, "menu item1"),
                React.createElement(MenuItem, { disabled: true }, "menu item2"),
                React.createElement(SubMenu, { title: "dropdown" },
                    React.createElement(MenuItem, null, "submenu item1"),
                    React.createElement(MenuItem, null, "submenu item2")),
                React.createElement(SubMenu, { title: "dropdown1" },
                    React.createElement(MenuItem, null, "submenu item1"),
                    React.createElement(MenuItem, null, "submenu item2")),
                React.createElement(MenuItem, null, "menu item3")),
            React.createElement(Button, { size: "lg", onClick: function () {
                    setShow(!show);
                } }, "toggle"),
            React.createElement(Transition, { in: show, animation: "zoom-in-left", timeout: 300 },
                React.createElement("div", null,
                    React.createElement("div", null, "11111111111111111111"),
                    React.createElement("div", null, "21111111111111111111"),
                    React.createElement("div", null, "31111111111111111111"),
                    React.createElement("div", null, "41111111111111111111"),
                    React.createElement("div", null, "51111111111111111111"),
                    React.createElement("div", null, "61111111111111111111"),
                    React.createElement("div", null, "71111111111111111111"))),
            React.createElement(Transition, { in: show, animation: "zoom-in-right", timeout: 300, wrapper: true },
                React.createElement(Button, { btnType: "primary", size: "lg" }, "A large button")))));
}
var App = function () {
    var _a = useState("111111"), title = _a[0], setTitle = _a[1];
    var postData = {
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
    var handleFileChange = function (e) {
        var files = e.target.files;
        if (files) {
            var uploadedFile = files[0];
            var formData = new FormData();
            formData.append(uploadedFile.name, uploadedFile);
            axios
                .post("http://jsonplaceholder.typicode.com/posts", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
                .then(function (res) {
                console.log(res);
                // setTitle(res.data[0].title);
            });
        }
    };
    return (React.createElement("div", { className: "App" },
        React.createElement("header", { className: "App-header" },
            React.createElement("h1", null, title),
            React.createElement("input", { type: "file", name: "file", onChange: handleFileChange }))));
};
export default App;
