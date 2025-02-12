export const useApi = () => {
    const baseURL = useRuntimeConfig().public.API_URL

    const post = async <T>(url: string, body: any): Promise<T | null> => {
        try {
            const { data } = await useFetch<T>(`${baseURL}${url}`, {
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