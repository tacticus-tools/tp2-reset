import { fn } from "storybook/test";
import { RadioGroup } from "./radio-group";
const meta = {
    title: "Form/RadioGroup",
    component: RadioGroup,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    args: { onChange: fn() },
};
export default meta;
export const Default = {
    args: {
        label: "Employment Type",
        name: "employmentType",
        options: [
            { value: "full-time", label: "Full Time" },
            { value: "part-time", label: "Part Time" },
        ],
    },
};
export const Selected = {
    args: {
        label: "Employment Type",
        name: "employmentType",
        options: [
            { value: "full-time", label: "Full Time" },
            { value: "part-time", label: "Part Time" },
        ],
        value: "full-time",
    },
};
export const MultipleOptions = {
    args: {
        label: "Subscription Plan",
        name: "plan",
        options: [
            { value: "basic", label: "Basic" },
            { value: "pro", label: "Pro" },
            { value: "enterprise", label: "Enterprise" },
        ],
        value: "pro",
    },
};
