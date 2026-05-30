import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import type { UserRole } from "../types/auth.ts";
import { useAuth } from "../auth/useAuth.ts";

type ProtectedRouteProps = {
    children: ReactNode;
    allowedRoles?: UserRole[];
};

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
    const { isAuthenticated, hasAnyRole } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    if (allowedRoles && !hasAnyRole(allowedRoles)) {
        return (
            <main className="UnauthorizedPage">
                <h1>Access denied</h1>
                <p>Your user does not have permission to access this section.</p>
            </main>
        );
    }
    return children;
}