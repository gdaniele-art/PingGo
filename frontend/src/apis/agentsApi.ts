import type {AgentResponse, MonitoredServiceResponse} from "../types/dashboard.ts";
import { apiFetch, parseJsonResponse } from "./http.ts";

export type CreateAgentRequest = {
    name: string;
    description: string;
};

export type UpdateAgentRequest = {
    name: string;
    description: string;
};

export async function getAllAgents():Promise<AgentResponse[]> {
    const resp: Response = await apiFetch("/api/agents");
    return parseJsonResponse<AgentResponse[]>(resp, "Failed to fetch agents");
}

export async function getAgentById(agentId: number): Promise<AgentResponse> {
    const response = await apiFetch(`/api/agents/${agentId}`);
    return parseJsonResponse<AgentResponse>(response, "Failed to fetch agent");
}

export async function getAgentServices(agentId: number): Promise<MonitoredServiceResponse[]> {
    const response = await apiFetch(`/api/agents/${agentId}/services`);
    return parseJsonResponse<MonitoredServiceResponse[]>(response, "Failed to fetch agent services");
}

export async function createAgent(payload: CreateAgentRequest): Promise<AgentResponse> {
    const response = await apiFetch("/api/agents", {
        method: "POST",
        body: JSON.stringify(payload),
    });
    return parseJsonResponse<AgentResponse>(response, "Failed to create agent");
}

export async function enableAgent(agentId: number): Promise<AgentResponse> {
    const response = await apiFetch(`/api/agents/${agentId}/enable`, {
        method: "PATCH",
    });
    return parseJsonResponse<AgentResponse>(response, "Failed to enable agent");
}

export async function disableAgent(agentId: number): Promise<AgentResponse> {
    const response = await apiFetch(`/api/agents/${agentId}/disable`, {
        method: "PATCH",
    });
    return parseJsonResponse<AgentResponse>(response, "Failed to disable agent");
}

export async function updateAgent(
    agentId: number,
    payload: UpdateAgentRequest
): Promise<AgentResponse> {
    const response = await apiFetch(`/api/agents/${agentId}`, {
        method: "PUT",
        body: JSON.stringify(payload),
    });
    return parseJsonResponse<AgentResponse>(response, "Failed to update agent");
}