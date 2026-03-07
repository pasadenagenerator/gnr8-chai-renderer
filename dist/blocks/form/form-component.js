"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { formSubmit } from "@/blocks/form/form-submit-action";
import { useState } from "react";
function getFormData(form) {
    const result = {};
    const fd = new FormData(form);
    for (const [k, v] of fd.entries()) {
        if (v instanceof File)
            continue;
        result[k] = v;
    }
    const elements = Array.from(form.elements);
    const boolGroups = new Map();
    for (const el of elements) {
        if (el instanceof HTMLInputElement &&
            (el.type === "checkbox" || el.type === "radio") &&
            el.name) {
            const arr = boolGroups.get(el.name) ?? [];
            arr.push(el);
            boolGroups.set(el.name, arr);
        }
    }
    for (const [name, group] of boolGroups.entries()) {
        const isChecked = group.some((i) => i.checked);
        result[name] = isChecked;
    }
    return result;
}
const getAdditionalData = () => {
    const pageUrl = typeof window !== "undefined" ? window.location.href : "";
    const referrer = typeof window !== "undefined" ? document.referrer : "";
    const pageTitle = typeof window !== "undefined" ? document.title : "";
    return {
        pageUrl,
        referrer,
        pageTitle,
    };
};
const SubmissionResponse = ({ state, successMessage, errorMessage, }) => {
    if (state === "" || state === "loading")
        return null;
    if (state === "success") {
        return (_jsx("div", { className: "text-green-500", dangerouslySetInnerHTML: { __html: successMessage } }));
    }
    if (state === "error") {
        return (_jsx("div", { className: "text-red-500", dangerouslySetInnerHTML: { __html: errorMessage } }));
    }
};
const FormComponent = ({ blockProps, styles, formName, children, errorMessage, successMessage, inBuilder, }) => {
    const [state, setState] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (inBuilder)
            return;
        setState("loading");
        try {
            const form = e.currentTarget;
            const formData = getFormData(form);
            const additionalData = getAdditionalData();
            const result = await formSubmit({ formData, additionalData });
            setState(result.success ? "success" : "error");
            if (result.success) {
                form.reset();
            }
        }
        catch (error) {
            console.error("Form submission error:", error);
            setState("error");
        }
    };
    return (_jsxs("form", { method: "POST", onSubmit: handleSubmit, ...blockProps, ...styles, className: `relative ${styles?.className || ""} ${blockProps?.className || ""}`, children: [_jsx("input", { type: "hidden", value: formName, name: "formName", readOnly: true, hidden: true }), _jsx("fieldset", { disabled: state === "loading", children: children }), _jsx(SubmissionResponse, { state: state, successMessage: successMessage, errorMessage: errorMessage })] }));
};
export default FormComponent;
