import axiosInstance from '../../lib/axios';
import axios, { AxiosResponse } from 'axios';

import { FeaturedContent } from "../../types";

// fetch featured content posts
export async function fetchFeaturedContent(): Promise<FeaturedContent[]> {
    try {
        const response: AxiosResponse<{ data: { featuredContent: FeaturedContent[] } }> = await axiosInstance.get('/featured-content');
        
        const data = response.data.data.featuredContent || [];
        
        return data;
    } catch (error: any) {
        console.error('Error in fetchFeaturedContent:', error);

        if (axios.isAxiosError(error)) {
            console.error(`Axios error: ${error.message}`);
            if (error.response) {
                console.error(`Response status: ${error.response.status}`);
                console.error(`Response data: ${JSON.stringify(error.response.data)}`);
            }
        } else {
            console.error(`Unexpected error: ${error}`);
        }

        throw error;
    }
}