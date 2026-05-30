import { clearStoredSession, getStoredSession } from "../auth/authStorage.ts";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

export class ApiError extends Error {
    status: number;

    constructor(message: string, status: number) {
        super(message);
        this.status = status;
    }
}

async function getErrorMessage(response: Response, fallbackMessage: string): Promise<string> {
    try {
        const body = await response.json();

        if (typeof body.message === "string") {
            return body.message;
        }

        if (typeof body.error === "string") {
            return body.error;
        }
    } catch {//if the backend returns no json body, use fallbackMessage.
    }
    return fallbackMessage;
}

export async function apiFetch(path: string, init: RequestInit = {}): Promise<Response> {
    const session = getStoredSession();
    const headers = new Headers(init.headers);

    if (session?.token) {
        headers.set("Authorization", `Bearer ${session.token}`);
    }
    if (init.body && !headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
    }

    const response = await fetch(`${API_BASE_URL}${path}`, {
        ...init,
        headers,});

    if (response.status === 401) {
        clearStoredSession();
        window.dispatchEvent(new Event("pinggo-auth-expired"));
    }
    return response;
}

export async function parseJsonResponse<T>(response: Response, fallbackMessage: string): Promise<T> {
    if (!response.ok) {
        throw new ApiError(await getErrorMessage(response, fallbackMessage), response.status);
    }

    if (response.status === 204) {
        return undefined as T;
    }
    return response.json() as Promise<T>;
}