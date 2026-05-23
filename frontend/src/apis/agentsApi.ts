import type {AgentResponse} from "../types/dashboard.ts";

export async function getAllAgents():Promise<AgentResponse[]> {
    const resp: Response = await fetch("/api/agents");
    if(!resp.ok) {
        throw new Error(`Failed to fetch agents`);
    }
    return resp.json();
}