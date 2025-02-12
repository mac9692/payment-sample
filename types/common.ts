export interface APIResponse<T> {
    timestamp: Date,
    code: string,
    isProcess: string,
    payload: T
}