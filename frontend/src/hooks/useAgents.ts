import type { AgentResponse } from "../types/dashboard.ts";
import { useEffect, useState } from "react";
import { createAgent, getAllAgents, type CreateAgentRequest } from "../apis/agentsApi.ts";

export function useAgents() {
    const [data, setData] = useState<AgentResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [creating, setCreating] = useState<boolean>(false);
    const [createError, setCreateError] = useState<string | null>(null);

    async function fetchAgents() {
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
    }

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

    useEffect(() => {
        fetchAgents();
    }, []);

    return {data, loading, error, creating, createError, addAgent, refetch: fetchAgents,};
}