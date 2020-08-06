import React, { FC, useRef, ChangeEvent, useState } from "react";
import { ThemeProps } from "../Icon/icon";

export interface ProgressProps {
  percent: number;
  strokeHeight?: number;
  showText?: boolean;
  styles?: React.CSSProperties;
  theme?: ThemeProps;
}

export const Progress: FC<ProgressProps> = (props) => {
  const { percent, styles, strokeHeight, showText, theme } = props;
  return (
    <div className="xdf-progress-bar" style={styles}>
      <div
        className="xdf-progress-bar-outer"
        style={{
          height: `${strokeHeight}px`,
        }}
      >
        <div
          className={`xdf-progress-bar-inner color-${theme}`}
          style={{ width: `${percent}%` }}
        >
          {showText && <span className="inner-text">{`${percent}%`}</span>}
        </div>
      </div>
    </div>
  );
};

Progress.defaultProps = {
  percent: 0,
  strokeHeight: 15,
  showText: true,
  theme: "primary",
};

export default Progress;
