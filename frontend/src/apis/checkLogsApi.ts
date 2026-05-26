import type { CheckLogResponse } from "../types/dashboard.ts";

export async function getRecentLogs(): Promise<CheckLogResponse[]> {
    const response = await fetch("/api/check-logs/recent");

    if (!response.ok) {
        throw new Error("Failed to fetch recent logs");
    }

    return response.json();
}

export async function getRecentLogsByServiceKey(serviceKey: string): Promise<CheckLogResponse[]> {
    const response = await fetch(`/api/check-logs/service-key/${serviceKey}/recent`);

    if (!response.ok) {
        throw new Error("Failed to fetch service logs");
    }

    return response.json();
}

export async function getRecentLogsByMonitoredServiceId(monitoredServiceId: number): Promise<CheckLogResponse[]> {
    const response = await fetch(`/api/check-logs/service/${monitoredServiceId}/recent`);

    if (!response.ok) {
        throw new Error("Failed to fetch service logs");
    }

    return response.json();
}

export async function getErrorLogsByAgentId(agentId: number): Promise<CheckLogResponse[]> {
    const response = await fetch(`/api/check-logs/agent/${agentId}/errors`);

    if (!response.ok) {
        throw new Error("Failed to fetch agent error logs");
    }

    return response.json();
}