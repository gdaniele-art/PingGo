export type UserRole = "ADMIN" | "VIEWER" | "AGENT";

export type LoginRequest = {
    email: string;
    password: string;
};

export type AuthResponse = {
    token: string;
    email: string;
    expiresAt: number | null;
};

export type AuthSession = {
    token: string;
    email: string;
    roles: UserRole[];
    expiresAt: number;
};

export type JwtPayload = {
    sub?: string;
    roles?: string[];
    exp?: number;
};

export type UserResponse = {
    id: string;
    email: string;
    role: UserRole;
    enabled: boolean;
    createdAt: string;
    updatedAt: string | null;
};

export type CreateUserRequest = {
    email: string;
    password: string;
    role: "VIEWER";
};
export type UpdateUserRoleRequest = {
    role: "ADMIN" | "VIEWER";
};