import type {MonitoredServiceResponse} from "../types/dashboard.ts";

const API_URL:string= "http://localhost:8080";

export async function getAllServices():Promise<MonitoredServiceResponse[]> {
    const resp = await fetch(`${API_URL}/api/v1/services`);
    if (!resp.ok) {
        throw new Error("Failed to fetch services");
    }
    return resp.json();
}