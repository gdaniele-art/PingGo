import type {CheckMethod, MonitoredServiceResponse} from "../types/dashboard.ts";


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
