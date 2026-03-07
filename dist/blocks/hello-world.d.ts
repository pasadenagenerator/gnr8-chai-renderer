import { ChaiBlockComponentProps, ChaiBlockConfig, ChaiStyles } from "@chaibuilder/next/types";
type Props = {
    name: string;
    styles: ChaiStyles;
};
declare const HelloWorld: (props: ChaiBlockComponentProps<Props>) => import("react/jsx-runtime").JSX.Element;
export declare const HelloWorldBlock: ChaiBlockConfig;
export default HelloWorld;
