import { FC, ReactElement, InputHTMLAttributes, ChangeEvent } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
declare type InputSize = "lg" | "sm";
export interface BaseInputProps extends Omit<InputHTMLAttributes<HTMLElement>, "size"> {
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
/**
 * Input 输入框 通过鼠标或键盘输入内容，是最基础的表单域的包装
 *
 * ```javascript
 * import {Input} from "xdf-uilib"
 * ```
 *
 * 支持HTMLInput的所有基本属性
 */
export declare const Input: FC<BaseInputProps>;
export default Input;
