import type {AgentResponse} from "../types/dashboard.ts";
import {useEffect, useState} from "react";
import {getAllAgents} from "../apis/agentsApi.ts";

export function useAgents() {
    const[data,setData] = useState<AgentResponse[]>([]);
    const[loading,setLoading] = useState<boolean>(true);
    const[error,setError] = useState<string | null>(null);

    useEffect(() => {
        const getData = async () => {
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
            }finally {
                setLoading(false);
            }
        };
        getData();
    }, []);

    return {data,loading,error};
}