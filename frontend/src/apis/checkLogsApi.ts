import type { CheckLogResponse } from "../types/dashboard.ts";
import { apiFetch, parseJsonResponse } from "./http.ts";

export async function getRecentLogs(): Promise<CheckLogResponse[]> {
    const response = await apiFetch("/api/check-logs/recent");
    return parseJsonResponse<CheckLogResponse[]>(response, "Failed to fetch recent logs");
}

export async function getRecentLogsByServiceKey(serviceKey: string): Promise<CheckLogResponse[]> {
    const response = await apiFetch(`/api/check-logs/service-key/${encodeURIComponent(serviceKey)}/recent`);
    return parseJsonResponse<CheckLogResponse[]>(response, "Failed to fetch service logs");
}

export async function getRecentLogsByMonitoredServiceId(monitoredServiceId: number): Promise<CheckLogResponse[]> {
    const response = await apiFetch(`/api/check-logs/service/${monitoredServiceId}/recent`);
    return parseJsonResponse<CheckLogResponse[]>(response, "Failed to fetch service logs");
}

export async function getErrorLogsByAgentId(agentId: number): Promise<CheckLogResponse[]> {
    const response = await apiFetch(`/api/check-logs/agent/${agentId}/errors`);
    return parseJsonResponse<CheckLogResponse[]>(response, "Failed to fetch agent error logs");
}