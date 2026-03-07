type ChaiStyles = Record<string, string>;
declare const FormComponent: ({ blockProps, styles, formName, children, errorMessage, successMessage, inBuilder, }: {
    blockProps: React.HTMLAttributes<HTMLFormElement>;
    styles: ChaiStyles;
    formName: string;
    children: React.ReactNode;
    successMessage: string;
    errorMessage: string;
    inBuilder: boolean;
}) => import("react/jsx-runtime").JSX.Element;
export default FormComponent;
