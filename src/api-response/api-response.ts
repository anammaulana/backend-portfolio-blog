// src/common/responses/api-response.ts
export class APIResponse<T = any> {
    success: boolean;
    message: string;
    data?: T | null;
    error?: any;

    private constructor(
        success: boolean,
        message: string,
        data?: T | null,
        error?: any
    ) {
        this.success = success;
        this.message = message;
        this.data = data;
        this.error = error;
    }

    static success<T>(data: T, message = 'Success'): APIResponse<T> {
        return new APIResponse<T>(true, message, data);
    }

    static error<T = any>(message = 'Error', error?: any): APIResponse<T> {
        return new APIResponse<T>(false, message, null, error);
    }
}
  