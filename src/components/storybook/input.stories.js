import { fn } from "storybook/test";
import { Input } from "./input";
const meta = {
    title: "Form/Input",
    component: Input,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    args: { onChange: fn() },
};
export default meta;
export const Default = {
    args: {
        label: "Email Address",
        id: "email",
        placeholder: "Enter your email",
    },
};
export const Required = {
    args: {
        label: "First Name",
        id: "firstName",
        placeholder: "John",
        required: true,
    },
};
export const WithValue = {
    args: {
        label: "Last Name",
        id: "lastName",
        value: "Doe",
        placeholder: "Enter last name",
    },
};
