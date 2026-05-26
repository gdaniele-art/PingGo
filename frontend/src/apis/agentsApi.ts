import type {AgentResponse} from "../types/dashboard.ts";
export type CreateAgentRequest = {
    name: string;
    description: string;
};

export async function getAllAgents():Promise<AgentResponse[]> {
    const resp: Response = await fetch("/api/agents");
    if(!resp.ok) {
        throw new Error(`Failed to fetch agents`);
    }
    return resp.json();
}
export async function createAgent(payload: CreateAgentRequest) {
    const response = await fetch("/api/agents", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error("Failed to create agent");
    }
    return response.json();
}