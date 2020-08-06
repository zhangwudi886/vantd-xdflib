import React from "react";
export var Progress = function (props) {
    var percent = props.percent, styles = props.styles, strokeHeight = props.strokeHeight, showText = props.showText, theme = props.theme;
    return (React.createElement("div", { className: "xdf-progress-bar", style: styles },
        React.createElement("div", { className: "xdf-progress-bar-outer", style: {
                height: strokeHeight + "px",
            } },
            React.createElement("div", { className: "xdf-progress-bar-inner color-" + theme, style: { width: percent + "%" } }, showText && React.createElement("span", { className: "inner-text" }, percent + "%")))));
};
Progress.defaultProps = {
    percent: 0,
    strokeHeight: 15,
    showText: true,
    theme: "primary",
};
export default Progress;
