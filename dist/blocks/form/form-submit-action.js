"use server";
import { db, safeQuery, schema } from "@chaibuilder/next/actions";
export async function formSubmit(data) {
    try {
        const appKey = process.env.CHAIBUILDER_APP_KEY;
        if (!appKey) {
            console.error("CHAIBUILDER_APP_KEY not set");
            return { success: false };
        }
        const { formData, additionalData = {} } = data;
        const formName = additionalData.formName || "contact";
        const pageUrl = additionalData.pageUrl || "";
        if (typeof formName !== "string" || formName.length > 255) {
            console.error("Invalid formName");
            return { success: false };
        }
        const formSubmission = {
            app: appKey,
            formName,
            formData: formData,
            additionalData: additionalData,
            pageUrl,
        };
        const { error } = await safeQuery(() => db.insert(schema.appFormSubmissions).values(formSubmission));
        if (error) {
            console.error("Form submission error:", error);
            return { success: false };
        }
        return { success: true };
    }
    catch (error) {
        console.error("Form submission error:", error);
        return { success: false };
    }
}
