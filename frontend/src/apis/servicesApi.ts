import type {CheckLogResponse, CheckMethod, MonitoredServiceResponse} from "../types/dashboard.ts";


export type CreateMonitoredServiceRequest = {
    serviceKey: string;
    name: string;
    url: string;
    checkMethod: CheckMethod;
    agentId: number;
};

export async function getAllServices():Promise<MonitoredServiceResponse[]> {
    const resp: Response  = await fetch("/api/services");
    if (!resp.ok) {
        throw new Error("Failed to fetch services");
    }
    return resp.json();
}
export async function createService(payload: CreateMonitoredServiceRequest):Promise<MonitoredServiceResponse> {
    const resp = await fetch("/api/services", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!resp.ok) {
        throw new Error("Failed to create service");
    }

    return resp.json();
}
export async function getServiceByServiceKey(serviceKey: string): Promise<MonitoredServiceResponse> {
    const response = await fetch(`/api/services/service-key/${serviceKey}`);

    if (!response.ok) {
        throw new Error("Failed to fetch service");
    }

    return response.json();
}

export async function getServiceRecentLogs(serviceKey: string): Promise<CheckLogResponse[]> {
    const response = await fetch(`/api/check-logs/service-key/${serviceKey}/recent`);

    if (!response.ok) {
        throw new Error("Failed to fetch service logs");
    }

    return response.json();
}

export async function enableService(serviceId: number): Promise<MonitoredServiceResponse> {
    const response = await fetch(`/api/services/${serviceId}/enable`, {
        method: "PATCH",
    });

    if (!response.ok) {
        throw new Error("Failed to enable service");
    }

    return response.json();
}

export async function disableService(serviceId: number): Promise<MonitoredServiceResponse> {
    const response = await fetch(`/api/services/${serviceId}/disable`, {
        method: "PATCH",
    });

    if (!response.ok) {
        throw new Error("Failed to disable service");
    }
    return response.json();
}
