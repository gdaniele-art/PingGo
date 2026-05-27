import type {AgentResponse, MonitoredServiceResponse} from "../types/dashboard.ts";
export type CreateAgentRequest = {
    name: string;
    description: string;
};
export type UpdateAgentRequest = {
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
export async function getAgentById(agentId: number): Promise<AgentResponse> {
    const response = await fetch(`/api/agents/${agentId}`);

    if (!response.ok) {
        throw new Error("Failed to fetch agent");
    }

    return response.json();
}
export async function getAgentServices(agentId: number): Promise<MonitoredServiceResponse[]> {
    const response = await fetch(`/api/agents/${agentId}/services`);

    if (!response.ok) {
        throw new Error("Failed to fetch agent services");
    }
    return response.json();
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

export async function enableAgent(agentId: number): Promise<AgentResponse> {
    const response = await fetch(`/api/agents/${agentId}/enable`, {
        method: "PATCH",
    });

    if (!response.ok) {
        throw new Error("Failed to enable agent");
    }

    return response.json();
}

export async function disableAgent(agentId: number): Promise<AgentResponse> {
    const response = await fetch(`/api/agents/${agentId}/disable`, {
        method: "PATCH",
    });

    if (!response.ok) {
        throw new Error("Failed to disable agent");
    }

    return response.json();
}

export async function updateAgent(
    agentId: number,
    payload: UpdateAgentRequest
): Promise<AgentResponse> {
    const response = await fetch(`/api/agents/${agentId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error("Failed to update agent");
    }

    return response.json();
}