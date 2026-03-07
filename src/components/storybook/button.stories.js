import { fn } from "storybook/test";
import { Button } from "./button";
const meta = {
    title: "Form/Button",
    component: Button,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    args: { onClick: fn() },
};
export default meta;
export const Primary = {
    args: {
        variant: "primary",
        children: "Primary Button",
    },
};
export const Secondary = {
    args: {
        variant: "secondary",
        children: "Secondary Button",
    },
};
export const Danger = {
    args: {
        variant: "danger",
        children: "Delete Account",
    },
};
export const Small = {
    args: {
        size: "small",
        children: "Small Button",
    },
};
export const Medium = {
    args: {
        size: "medium",
        children: "Medium Button",
    },
};
export const Large = {
    args: {
        size: "large",
        children: "Large Button",
    },
};
export const Disabled = {
    args: {
        variant: "primary",
        children: "Disabled Button",
        disabled: true,
    },
};
