import { fn } from "storybook/test";
import { Slider } from "./slider";
const meta = {
    title: "Form/Slider",
    component: Slider,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    args: { onChange: fn() },
};
export default meta;
export const Default = {
    args: {
        label: "Volume",
        id: "volume",
        value: 50,
    },
};
export const Skill = {
    args: {
        label: "Plays Guitar",
        id: "guitar",
        value: 75,
        min: 0,
        max: 100,
    },
};
export const NoValue = {
    args: {
        label: "Experience Level",
        id: "experience",
        value: 30,
        showValue: false,
    },
};
export const CustomRange = {
    args: {
        label: "Custom Range",
        id: "custom-range",
        value: 5,
        min: 1,
        max: 20,
        step: 1,
    },
};
