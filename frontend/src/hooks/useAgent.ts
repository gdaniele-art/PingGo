import type { AgentResponse, MonitoredServiceResponse } from "../types/dashboard.ts";
import { useCallback, useEffect, useState } from "react";
import {
    disableAgent,
    enableAgent,
    getAgentById,
    getAgentServices,
    updateAgent,
    type UpdateAgentRequest,
} from "../apis/agentsApi.ts";

export function useAgent(agentId: number) {
    const [data, setData] = useState<AgentResponse | null>(null);
    const [services, setServices] = useState<MonitoredServiceResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [updating, setUpdating] = useState<boolean>(false);
    const [updateError, setUpdateError] = useState<string | null>(null);

    const fetchAgent = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const agentRes = await getAgentById(agentId);
            const servicesRes = await getAgentServices(agentId);

            setData(agentRes);
            setServices(servicesRes);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Unknown error occurred");
            }
        } finally {
            setLoading(false);
        }
    }, [agentId]);

    async function toggleAgentStatus() {
        if (!data) {
            return;
        }

        try {
            setUpdating(true);
            setUpdateError(null);

            const updatedAgent = data.enabled
                ? await disableAgent(data.id)
                : await enableAgent(data.id);

            setData(updatedAgent);

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

    async function editAgent(payload: UpdateAgentRequest): Promise<AgentResponse | undefined> {
        if (!data) {
            return;
        }

        try {
            setUpdating(true);
            setUpdateError(null);

            const updatedAgent = await updateAgent(data.id, payload);

            setData(updatedAgent);

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
            await fetchAgent();
        };

        getData();
    }, [fetchAgent]);

    return {
        data,
        services,
        loading,
        error,
        updating,
        updateError,
        toggleAgentStatus,
        editAgent,
        refetch: fetchAgent,
    };
}
