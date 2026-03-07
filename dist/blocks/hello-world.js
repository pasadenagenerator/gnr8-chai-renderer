import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { registerChaiBlockProps, stylesProp } from "@chaibuilder/next/runtime";
const HelloWorld = (props) => {
    const { name, styles, blockProps } = props;
    return (_jsx("div", { ...blockProps, ...styles, children: _jsxs("h1", { children: ["Hello ", name] }) }));
};
export const HelloWorldBlock = {
    type: "hello-world",
    label: "Hello World",
    group: "Custom Blocks",
    props: registerChaiBlockProps({
        properties: {
            styles: stylesProp("text-lg font-bold underline"),
            name: { type: "string", title: "Name", default: "World" },
        },
    }),
};
export default HelloWorld;
