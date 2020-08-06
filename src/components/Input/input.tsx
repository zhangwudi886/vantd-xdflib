import React, {
  FC,
  ReactElement,
  InputHTMLAttributes,
  ChangeEvent,
} from "react";
import classNames from "classnames";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import Icon from "../Icon/icon";
type InputSize = "lg" | "sm";

export interface BaseInputProps
  extends Omit<InputHTMLAttributes<HTMLElement>, "size"> {
  /** 是否禁用 Input */
  disabled?: boolean;
  /** 设置 Input 大小 */
  size?: InputSize;
  /** 添加图标，在右侧炫富添加一个图标，用于提示 */
  icon?: IconProp;
  /** 添加前缀，用于配置一些固定组合 */
  prepend?: string | ReactElement;
  /** 添加后缀，用于配置一些固定组合 */
  append?: string | ReactElement;
  /** 修改onchange时间的特定event */
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
// ChangeEvent注意这个修改类型的方法
/**
 * Input 输入框 通过鼠标或键盘输入内容，是最基础的表单域的包装
 *
 * ```javascript
 * import {Input} from "xdf-uilib"
 * ```
 *
 * 支持HTMLInput的所有基本属性
 */
export const Input: FC<BaseInputProps> = (props) => {
  // 伪代码
  // 第一步 取出所有的属性

  const { icon, disabled, size, prepend, append, style, ...restProps } = props;
  //   const [inputValue, setInputValue] = useState(value);
  // 第二部 根据属性计算className
  const classes = classNames("xdf-input-wrapper", {
    [`input-size-${size}`]: size,
    "is-disabled": disabled,
    "input-group": prepend || append,
    "input-group-append": !!append,
    "input-group-prepend": !!prepend,
  });
  const fixControlledValue = (value: any) => {
    if (typeof value === "undefined" || value === null) {
      return "";
    }
    return value;
  };
  if ("value" in props) {
    delete restProps.defaultValue;
    // 如果初始值为null，则设置默认值。
    restProps.value = fixControlledValue(restProps.value);
  }
  return (
    // 第三部 是否添加一些特定的节点，icon prepend append
    <div className={classes} style={style}>
      {prepend && <div className="xdf-input-group-prepend">{prepend}</div>}
      {icon && (
        <div className="icon-wrapper">
          <Icon icon={icon} title={`title-${icon}`}></Icon>
        </div>
      )}
      <input className="xdf-input-inner" disabled={disabled} {...restProps} />
      {append && <div className="xdf-input-group-append">{append}</div>}
    </div>
  );
};

export default Input;
