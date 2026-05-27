import type { AgentResponse } from "../types/dashboard.ts";
import { useCallback, useEffect, useState } from "react";
import {
    createAgent,
    getAllAgents,
    updateAgent,
    type CreateAgentRequest,
    type UpdateAgentRequest,
} from "../apis/agentsApi.ts";

export function useAgents() {
    const [data, setData] = useState<AgentResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [creating, setCreating] = useState<boolean>(false);
    const [createError, setCreateError] = useState<string | null>(null);
    const [updating, setUpdating] = useState<boolean>(false);
    const [updateError, setUpdateError] = useState<string | null>(null);

    const fetchAgents = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const res = await getAllAgents();
            setData(res);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Unknown error occurred");
            }
        } finally {
            setLoading(false);
        }
    }, []);

    async function addAgent(payload: CreateAgentRequest) {
        try {
            setCreating(true);
            setCreateError(null);

            const createdAgent = await createAgent(payload);

            setData((currentAgents) => [...currentAgents, createdAgent]);

            return createdAgent;
        } catch (err) {
            if (err instanceof Error) {
                setCreateError(err.message);
            } else {
                setCreateError("Unknown error occurred");
            }

            throw err;
        } finally {
            setCreating(false);
        }
    }

    async function editAgent(agentId: number, payload: UpdateAgentRequest): Promise<AgentResponse> {
        try {
            setUpdating(true);
            setUpdateError(null);

            const updatedAgent = await updateAgent(agentId, payload);

            setData((currentAgents) =>
                currentAgents.map((agent) =>
                    agent.id === updatedAgent.id ? updatedAgent : agent
                )
            );

            return updatedAgent;
        } catch (err) {
            if (err instanceof Error) {
                setUpdateError(err.message);
            } else {
                setUpdateError("Unknown error occurred");
            }

            throw err;
        } finally {
            setUpdating(false);
        }
    }

    useEffect(() => {
        const getData = async () => {
            await fetchAgents();
        };

        getData();
    }, [fetchAgents]);

    return {
        data,
        loading,
        error,
        creating,
        createError,
        updating,
        updateError,
        addAgent,
        editAgent,
        refetch: fetchAgents,
    };
}
