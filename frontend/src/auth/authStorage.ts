import type {AuthResponse, AuthSession, JwtPayload, UserRole} from "../types/auth.ts";

const AUTH_STORAGE_KEY = 'auth';
const VALID_ROLES: UserRole[] = ["ADMIN","VIEWER","AGENT"];
function decodeBase64Url(value: string): string {
    const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(base64.length + (4 - base64.length % 4) % 4, "=");

    return window.atob(padded);
}

export function decodeJwtPayload(token: string): JwtPayload | null {
    try {
        const [, payload] = token.split(".");

        if (!payload) {
            return null;
        }

        return JSON.parse(decodeBase64Url(payload)) as JwtPayload;
    } catch {
        return null;
    }
}

function parseRoles(payload: JwtPayload | null): UserRole[] {
    if (!payload?.roles) {
        return [];
    }

    return payload.roles.filter((role): role is UserRole =>
        VALID_ROLES.includes(role as UserRole));
}

export function createSession(authResponse: AuthResponse): AuthSession {
    const payload = decodeJwtPayload(authResponse.token);
    const expiresAtFromToken = payload?.exp ? payload.exp * 1000 : 0;

    return {
        token: authResponse.token,
        email: authResponse.email,
        roles: parseRoles(payload),
        expiresAt: authResponse.expiresAt ?? expiresAtFromToken,
    };
}

export function isSessionExpired(session: AuthSession): boolean {
    return Date.now() >= session.expiresAt;
}

export function getStoredSession(): AuthSession | null {
    const rawSession = window.localStorage.getItem(AUTH_STORAGE_KEY);

    if (!rawSession) {
        return null;
    }

    try {
        const session = JSON.parse(rawSession) as AuthSession;

        if (isSessionExpired(session)) {
            clearStoredSession();
            return null;
        }

        return session;
    } catch {
        clearStoredSession();
        return null;
    }
}

export function saveSession(session: AuthSession) {
    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
}

export function clearStoredSession() {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
}