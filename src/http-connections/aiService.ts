import apiClient from "./apiClient";
import { ENDPOINTS } from "../endpoints";

export const generateEnhancedCaption = async (currentDescription: string) => {
    try {
        const response = await apiClient.post(`${ENDPOINTS.AI}${ENDPOINTS.ENHANCE_CAPTION}`, {
            "caption": `${currentDescription}`
        });

        return response.data.enhancedCaption;
    } catch (error) {
        console.error('Error generating enhanced caption!', error);
    }
};