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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import React from "react";
import { render, fireEvent, cleanup, wait, } from "@testing-library/react";
import Menu from "./menu";
import MenuItem from "./menuItem";
import SubMenu from "./subMenu";
var testProps = {
    defaultIndex: "0",
    onSelect: jest.fn(),
    className: "test",
};
var testVerProps = {
    defaultIndex: "0",
    onSelect: jest.fn(),
    mode: "vertical",
    defaultOpenSubMenus: ["4"],
};
var generateMenu = function (props) {
    return (React.createElement(Menu, __assign({}, props),
        React.createElement(MenuItem, null, "active"),
        React.createElement(MenuItem, { disabled: true }, "disabled"),
        React.createElement(MenuItem, null, "third"),
        React.createElement(SubMenu, { title: "dropdown1" },
            React.createElement(MenuItem, null, "submenu1item1"),
            React.createElement(MenuItem, null, "submenu1item2")),
        React.createElement(SubMenu, { title: "dropdown2" },
            React.createElement(MenuItem, null, "submenu2item1"),
            React.createElement(MenuItem, null, "submenu2item2"))));
};
var createStyleFile = function () {
    var cssFile = "\n    .xdf-submenu{\n      display:none;\n    }\n    .xdf-submenu.menu-opened{\n      display:block;\n    }\n  ";
    var style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = cssFile;
    return style;
};
// 通用的逻辑怎么写，。
// beforeEach,通用的函数  和钩子一样。
var wrapper, wrapper2, menuElement, activeElement, disabledElement;
describe("test Menu and MenuItem horizontal component", function () {
    beforeEach(function () {
        wrapper = render(generateMenu(testProps));
        wrapper.container.append(createStyleFile());
        menuElement = wrapper.getByTestId("xdf-menu"); //获取元素，根据data-testid
        activeElement = wrapper.getByText("active");
        disabledElement = wrapper.getByText("disabled");
    });
    it("should render correct Menu and MenuItem based on default props", function () {
        expect(menuElement).toBeInTheDocument();
        expect(menuElement).toHaveClass("xdf-menu test");
        // expect(menuElement.getElementsByTagName("li").length).toEqual(3);
        expect(menuElement.querySelectorAll(":scope > li").length).toEqual(5);
        expect(activeElement).toHaveClass("xdf-menu-item menu-item-is-active");
        expect(disabledElement).toHaveClass("xdf-menu-item menu-item-is-disabled");
    });
    it("click item should change active and call the right callback", function () {
        var thirdElement = wrapper.getByText("third");
        fireEvent.click(thirdElement);
        expect(thirdElement).toHaveClass("menu-item-is-active");
        expect(activeElement).not.toHaveClass("menu-item-is-active");
        expect(testProps.onSelect).toHaveBeenCalledWith("2");
        fireEvent.click(disabledElement);
        expect(disabledElement).not.toHaveClass("menu-item-is-active");
        expect(testProps.onSelect).not.toHaveBeenCalledWith("1");
    });
    it("should render vertical mode is set to vettical", function () {
        //   为什么别的地方不需要cleanup，使用为在每个it执行完成之后会自动执行以下cleanup
        cleanup();
        var wrapper = render(generateMenu(testVerProps));
        menuElement = wrapper.getByTestId("xdf-menu");
        expect(menuElement).toHaveClass("menu-vertical");
    });
    it("should show dropdown items when hover on SubMenu", function () { return __awaiter(void 0, void 0, void 0, function () {
        var dropdownElement;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    expect(wrapper.queryByText("submenu1item1")).not.toBeVisible(); //因为测试工具是个黑盒工具，无法通过display:none和block来判断元素是否展示，思考：这里是否需要加载所有的css来判断这里的展示问题
                    dropdownElement = wrapper.getByText("dropdown1");
                    fireEvent.mouseEnter(dropdownElement);
                    // 这里第一次会失败，因为没有找到这个元素。出现问题，因为是个异步的操作。怎么办么？
                    return [4 /*yield*/, wait(function () {
                            expect(wrapper.queryByText("submenu1item1")).toBeVisible(); //hover的时候，一直判断直到显示
                            // waitFor 等待使用。
                            // expect(wrapper.queryByText("submenu1item1")).not.toBeVisible();//如果判断不展示呢，会直接正常，因为开始就是不展示的
                        })];
                case 1:
                    // 这里第一次会失败，因为没有找到这个元素。出现问题，因为是个异步的操作。怎么办么？
                    _a.sent();
                    fireEvent.mouseLeave(dropdownElement);
                    return [4 /*yield*/, wait(function () {
                            expect(wrapper.queryByText("submenu1item1")).not.toBeVisible(); //离开的时候，一直判断直到消失
                        })];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("test Menu and MenuItem vertical component", function () {
    beforeEach(function () {
        wrapper2 = render(generateMenu(testVerProps));
        wrapper2.container.append(createStyleFile());
    });
    it("should render vertical mode when mode is set to vertical", function () {
        var menuElement = wrapper2.getByTestId("xdf-menu");
        expect(menuElement).toHaveClass("menu-vertical");
    });
    it("should show dropdown1 items when click on subMenu for vertical mode", function () {
        var dropdownElement = wrapper2.queryByText("submenu1item1");
        expect(dropdownElement).not.toBeVisible();
        fireEvent.click(wrapper2.getByText("dropdown1"));
        expect(dropdownElement).toBeVisible();
    });
    it("should show subMenu dropdown1 when defaultOpenSubMenus contains SubMenu index", function () {
        expect(wrapper2.queryByText("dropdown2")).toBeVisible();
    });
});
