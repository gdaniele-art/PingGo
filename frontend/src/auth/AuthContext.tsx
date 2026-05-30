import { createContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { login as loginRequest } from "../apis/authApi.ts";
import type { AuthSession, LoginRequest, UserRole } from "../types/auth.ts";
import {
    clearStoredSession,
    createSession,
    getStoredSession,
    isSessionExpired,
    saveSession,
} from "./authStorage.ts";

type AuthContextValue = {
    session: AuthSession | null;
    isAuthenticated: boolean;
    isAdmin: boolean;
    login: (payload: LoginRequest) => Promise<void>;
    logout: () => void;
    hasAnyRole: (roles: UserRole[]) => boolean;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

type AuthProviderProps = {
    children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
    const [session, setSession] = useState<AuthSession | null>(() => getStoredSession());

    useEffect(() => {
        function handleAuthExpired() {
            setSession(null);
        }

        window.addEventListener("pinggo-auth-expired", handleAuthExpired);

        return () => {
            window.removeEventListener("pinggo-auth-expired", handleAuthExpired);};}, []);

    useEffect(() => {
        if (!session) {
            return;
        }

        if (isSessionExpired(session)) {
            clearStoredSession();
            setSession(null);
            return;
        }

        const timeoutMs = session.expiresAt - Date.now();

        const timeoutId = window.setTimeout(() => {
            clearStoredSession();
            setSession(null);
        }, timeoutMs);

        return () => window.clearTimeout(timeoutId);
    }, [session]);

    async function login(payload: LoginRequest) {
        const authResponse = await loginRequest({
            email: payload.email.trim().toLowerCase(),
            password: payload.password,});

        const nextSession = createSession(authResponse);
        saveSession(nextSession);
        setSession(nextSession);
    }

    function logout() {
        clearStoredSession();
        setSession(null);
    }

    function hasAnyRole(roles: UserRole[]) {
        if (!session) {
            return false;
        }

        return roles.some((role) => session.roles.includes(role));
    }

    const value = useMemo<AuthContextValue>(() => ({
        session,
        isAuthenticated: session !== null,
        isAdmin: session?.roles.includes("ADMIN") ?? false,
        login,
        logout,
        hasAnyRole,}), [session]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>);
}