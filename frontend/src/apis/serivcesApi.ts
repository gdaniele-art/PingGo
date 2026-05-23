import type {MonitoredServiceResponse} from "../types/dashboard.ts";

export async function getAllServices():Promise<MonitoredServiceResponse[]> {
    const resp: Response  = await fetch("/api/services");
    if (!resp.ok) {
        throw new Error("Failed to fetch services");
    }
    return resp.json();
}