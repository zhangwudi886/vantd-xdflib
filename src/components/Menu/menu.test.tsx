import React from "react";
import {
  render,
  RenderResult,
  fireEvent,
  cleanup,
  wait,
} from "@testing-library/react";
import Menu, { MenuProps } from "./menu";
import MenuItem from "./menuItem";
import SubMenu from "./subMenu";

jest.mock("../Icon/icon", () => {
  return () => {
    return <i className="fa" />;
  };
});
jest.mock("react-transition-group", () => {
  return {
    CSSTransition: (props: any) => {
      return props.children;
    },
  };
});

const testProps: MenuProps = {
  defaultIndex: "0",
  onSelect: jest.fn(),
  className: "test",
};

const testVerProps: MenuProps = {
  defaultIndex: "0",
  onSelect: jest.fn(),
  mode: "vertical",
  defaultOpenSubMenus: ["0"],
};
const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem>third</MenuItem>
      <SubMenu title="dropdown1">
        <MenuItem>submenu1item1</MenuItem>
        <MenuItem>submenu1item2</MenuItem>
      </SubMenu>
      <SubMenu title="dropdown2">
        <MenuItem>submenu2item1</MenuItem>
        <MenuItem>submenu2item2</MenuItem>
      </SubMenu>
    </Menu>
  );
};

const createStyleFile = () => {
  const cssFile: string = `
    .xdf-submenu{
      display:none;
    }
    .xdf-submenu.menu-opened{
      display:block;
    }
  `;
  const style = document.createElement("style");
  style.type = "text/css";
  style.innerHTML = cssFile;
  return style;
};
// 通用的逻辑怎么写，。
// beforeEach,通用的函数  和钩子一样。
let wrapper: RenderResult,
  wrapper2: RenderResult,
  menuElement: HTMLElement,
  activeElement: HTMLElement,
  disabledElement: HTMLElement;
describe("test Menu and MenuItem horizontal component", () => {
  beforeEach(() => {
    wrapper = render(generateMenu(testProps));
    wrapper.container.append(createStyleFile());
    menuElement = wrapper.getByTestId("xdf-menu"); //获取元素，根据data-testid
    activeElement = wrapper.getByText("active");
    disabledElement = wrapper.getByText("disabled");
  });
  it("should render correct Menu and MenuItem based on default props", () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass("xdf-menu test");
    // expect(menuElement.getElementsByTagName("li").length).toEqual(3);
    expect(menuElement.querySelectorAll(":scope > li").length).toEqual(5);
    expect(activeElement).toHaveClass("xdf-menu-item menu-item-is-active");
    expect(disabledElement).toHaveClass("xdf-menu-item menu-item-is-disabled");
  });
  it("click item should change active and call the right callback", () => {
    const thirdElement = wrapper.getByText("third");
    fireEvent.click(thirdElement);
    expect(thirdElement).toHaveClass("menu-item-is-active");
    expect(activeElement).not.toHaveClass("menu-item-is-active");
    expect(testProps.onSelect).toHaveBeenCalledWith("2");
    fireEvent.click(disabledElement);
    expect(disabledElement).not.toHaveClass("menu-item-is-active");
    expect(testProps.onSelect).not.toHaveBeenCalledWith("1");
  });
  it("should render vertical mode is set to vettical", () => {
    //   为什么别的地方不需要cleanup，使用为在每个it执行完成之后会自动执行以下cleanup
    cleanup();
    const wrapper = render(generateMenu(testVerProps));
    menuElement = wrapper.getByTestId("xdf-menu");
    expect(menuElement).toHaveClass("menu-vertical");
  });
  it("should show dropdown items when hover on SubMenu", async () => {
    expect(wrapper.queryByText("submenu1item1")).not.toBeVisible(); //因为测试工具是个黑盒工具，无法通过display:none和block来判断元素是否展示，思考：这里是否需要加载所有的css来判断这里的展示问题
    const dropdownElement = wrapper.getByText("dropdown1");
    fireEvent.mouseEnter(dropdownElement);
    // 这里第一次会失败，因为没有找到这个元素。出现问题，因为是个异步的操作。怎么办么？
    await wait(() => {
      expect(wrapper.queryByText("submenu1item1")).toBeVisible(); //hover的时候，一直判断直到显示
      // waitFor 等待使用。
      // expect(wrapper.queryByText("submenu1item1")).not.toBeVisible();//如果判断不展示呢，会直接正常，因为开始就是不展示的
    });
    fireEvent.mouseLeave(dropdownElement);
    await wait(() => {
      expect(wrapper.queryByText("submenu1item1")).not.toBeVisible(); //离开的时候，一直判断直到消失
    });
  });
});

describe("test Menu and MenuItem vertical component", () => {
  beforeEach(() => {
    wrapper2 = render(generateMenu(testVerProps));
    wrapper2.container.append(createStyleFile());
  });
  it("should render vertical mode when mode is set to vertical", () => {
    const menuElement = wrapper2.getByTestId("xdf-menu");
    expect(menuElement).toHaveClass("menu-vertical");
  });
  it("should show dropdown1 items when click on subMenu for vertical mode", () => {
    const dropdownElement = wrapper2.queryByText("submenu1item1");
    expect(dropdownElement).not.toBeVisible();
    fireEvent.click(wrapper2.getByText("dropdown1"));
    expect(dropdownElement).toBeVisible();
  });
  it("should show subMenu dropdown1 when defaultOpenSubMenus contains SubMenu index", () => {
    expect(wrapper2.queryByText("dropdown2")).toBeVisible();
  });
});
