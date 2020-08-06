import React from "react";
declare const _default: {
    title: string;
    component: {
        ({ children, onClick, }: {
            children: React.ReactNode;
            onClick: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
        }): JSX.Element;
        displayName: string;
        propTypes: {
            children: import("prop-types").Validator<import("prop-types").ReactNodeLike>;
            onClick: import("prop-types").Requireable<(...args: any[]) => any>;
        };
        defaultProps: {
            onClick: () => void;
        };
    };
};
export default _default;
export declare const Text: () => JSX.Element;
export declare const Emoji: () => JSX.Element;
export declare const myButton2: () => JSX.Element;
