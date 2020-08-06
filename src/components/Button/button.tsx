import React, {
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
  ReactNode,
  FC,
} from "react";
import classNames from "classnames";
export type ButtonSize = "lg" | "sm";
export type ButtonType = "primary" | "default" | "danger" | "link";

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

type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
// 不能使用联合类型，联合类型是去子集而不是并集，或者或者  使用 |就是联合类型
// 交叉类型 intersection types  可以去并集。  使用&就是交叉类型
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;

export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

// partial属性是干啥的，都可以使用为可选的
/**
 * 这是我们的第一个button库
 * ## Button header
 * ```
 * import { Button } from './button'
 * ```
 */
export const Button: FC<ButtonProps> = (props) => {
  const {
    disabled,
    size,
    btnType,
    children,
    className,
    href,
    ...restProps
  } = props;
  const classes = classNames("btn", className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    [`disabled`]: btnType === "link" && disabled,
  });
  if (btnType === "link" && href) {
    return (
      <a className={classes} href={href} {...restProps}>
        {children}
      </a>
    );
  } else {
    return (
      <button className={classes} disabled={disabled} {...restProps}>
        {children}
      </button>
    );
  }
};
Button.defaultProps = {
  disabled: false,
  btnType: "default",
};
export default Button;
