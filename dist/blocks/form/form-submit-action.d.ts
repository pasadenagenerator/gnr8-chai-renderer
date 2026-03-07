type JsonValue = string | number | boolean | null | JsonValue[] | {
    [key: string]: JsonValue;
};
interface FormSubmissionData {
    formData: Record<string, JsonValue>;
    additionalData: Record<string, JsonValue>;
}
export declare function formSubmit(data: FormSubmissionData): Promise<{
    success: boolean;
}>;
export {};
