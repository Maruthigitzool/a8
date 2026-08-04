// src/lib/api/http-client.ts

const BASE_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export class ApiError extends Error {
    constructor(
        message: string,
        public status: number
    ) {
        super(message);
        this.name = "ApiError";
    }
}

type RequestOptions = RequestInit;

async function request<T>(
    endpoint: string,
    options: RequestOptions = {}
): Promise<T> {
    const response = await fetch(`${BASE_URL}/api${endpoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {}),
        },
        cache: "no-store",
    });

    if (!response.ok) {
        const error = await response.text();

        throw new ApiError(
            error || "Something went wrong",
            response.status
        );
    }

    return response.json();
}

export const apiClient = {
    get<T>(endpoint: string) {
        return request<T>(endpoint, {
            method: "GET",
        });
    },

    post<T>(endpoint: string, body: unknown) {
        return request<T>(endpoint, {
            method: "POST",
            body: JSON.stringify(body),
        });
    },

    put<T>(endpoint: string, body: unknown) {
        return request<T>(endpoint, {
            method: "PUT",
            body: JSON.stringify(body),
        });
    },

    delete<T>(endpoint: string) {
        return request<T>(endpoint, {
            method: "DELETE",
        });
    },
};