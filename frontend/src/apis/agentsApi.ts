import type {AgentResponse} from "../types/dashboard.ts";

const API_URL = 'http://localhost:8080';

export async function getAllAgents():Promise<AgentResponse[]> {
    const resp: Response = await fetch(`${API_URL}/api/agents`);
    if(!resp.ok) {
        throw new Error(`Failed to fetch agents`);
    }
    return resp.json();
}