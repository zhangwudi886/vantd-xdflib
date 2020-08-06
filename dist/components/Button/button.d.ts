import { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode, FC } from "react";
export declare type ButtonSize = "lg" | "sm";
export declare type ButtonType = "primary" | "default" | "danger" | "link";
interface BaseButtonProps {
    className?: string;
    /** 设置 Button 的禁用 */
    disabled?: boolean;
    /** 设置 Button 的大小 */
    size?: ButtonSize;
    /** 设置 Button 的类型 */
    btnType?: ButtonType;
    href?: string;
    children: ReactNode;
}
declare type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
declare type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;
export declare type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
/**
 * 这是我们的第一个button库
 * ## Button header
 * ```
 * import { Button } from './button'
 * ```
 */
export declare const Button: FC<ButtonProps>;
export default Button;
