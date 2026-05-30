import type { AuthResponse, LoginRequest } from "../types/auth.ts";
import { parseJsonResponse } from "./http.ts";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

export async function login(payload: LoginRequest): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),});

    return parseJsonResponse<AuthResponse>(response, "Failed to login");
}