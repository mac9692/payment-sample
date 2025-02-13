import type {APIResponse} from "~/types/common";

export const useApi = () => {
    const baseURL = useRuntimeConfig().public.API_URL

    const post = async <T>(url: string, body: any): Promise<APIResponse<T> | null> => {
        try {
            const { data } = await useFetch<APIResponse<T>>(`${baseURL}${url}`, {
                method: "POST",
                body,
            });

            return data.value
        } catch (error) {
            console.error("POST API 오류:", error);
            return null
        }
    }

    return { post }
}