import type {CheckLogResponse, CheckMethod, MonitoredServiceResponse} from "../types/dashboard.ts";
import { apiFetch, parseJsonResponse } from "./http.ts";

export type CreateMonitoredServiceRequest = {
    serviceKey: string;
    name: string;
    url: string;
    checkMethod: CheckMethod;
    agentId: number;
};

export type UpdateMonitoredServiceRequest = {
    name: string;
    url: string;
    checkMethod: CheckMethod;
    agentId: number;
};

export async function getAllServices():Promise<MonitoredServiceResponse[]> {
    const resp: Response  = await apiFetch("/api/services");
    return parseJsonResponse<MonitoredServiceResponse[]>(resp, "Failed to fetch services");
}

export async function createService(payload: CreateMonitoredServiceRequest):Promise<MonitoredServiceResponse> {
    const resp = await apiFetch("/api/services", {
        method: "POST",
        body: JSON.stringify(payload),
    });

    return parseJsonResponse<MonitoredServiceResponse>(resp, "Failed to create service");
}

export async function getServiceByServiceKey(serviceKey: string): Promise<MonitoredServiceResponse> {
    const response = await apiFetch(`/api/services/key/${encodeURIComponent(serviceKey)}`);
    return parseJsonResponse<MonitoredServiceResponse>(response, "Failed to fetch service");
}

export async function getServiceRecentLogs(serviceKey: string): Promise<CheckLogResponse[]> {
    const response = await apiFetch(`/api/check-logs/service-key/${encodeURIComponent(serviceKey)}/recent`);
    return parseJsonResponse<CheckLogResponse[]>(response, "Failed to fetch service logs");
}

export async function enableService(serviceId: number): Promise<MonitoredServiceResponse> {
    const response = await apiFetch(`/api/services/${serviceId}/enable`, {
        method: "PATCH",
    });

    return parseJsonResponse<MonitoredServiceResponse>(response, "Failed to enable service");
}

export async function disableService(serviceId: number): Promise<MonitoredServiceResponse> {
    const response = await apiFetch(`/api/services/${serviceId}/disable`, {
        method: "PATCH",
    });

    return parseJsonResponse<MonitoredServiceResponse>(response, "Failed to disable service");
}

export async function updateService(serviceId: number, payload: UpdateMonitoredServiceRequest): Promise<MonitoredServiceResponse> {
    const response = await apiFetch(`/api/services/${serviceId}`, {
        method: "PUT",
        body: JSON.stringify(payload),
    });

    return parseJsonResponse<MonitoredServiceResponse>(response, "Failed to update service");
}