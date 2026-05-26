import {useEffect, useState} from "react";
import type {CheckLogResponse} from "../types/dashboard.ts";
import {
    getErrorLogsByAgentId,
    getRecentLogs,
    getRecentLogsByMonitoredServiceId,
    getRecentLogsByServiceKey
} from "../apis/checkLogsApi.ts";

export function useLogs() {
    const[data,setData] = useState<CheckLogResponse[]>([]);
    const[loading,setLoading] = useState<boolean>(true);
    const[error,setError] = useState<string | null>(null);

    useEffect(() => {
        const getData = async () => {
            try {
                setLoading(true);
                setError(null);

                const res = await getRecentLogs();
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
        };
        getData();
    }, []);

    const loadRecentLogs = async(): Promise<CheckLogResponse[]> => {
        try{
            setLoading(true);
            setError(null);

            const logs = await getRecentLogs();
            setData(logs);

            return logs;
        }catch (err){
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Unknown error occurred");
            }
            throw err;
        }finally {
            setLoading(false);
        }
    }

    const loadServiceLogsByServiceKey = async(serviceKey: string): Promise<CheckLogResponse[]> => {
        try{
            setLoading(true);
            setError(null);

            const logs = await getRecentLogsByServiceKey(serviceKey);
            setData(logs);

            return logs;
        }catch (err){
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Unknown error occurred");
            }
            throw err;
        }finally {
            setLoading(false);
        }
    }

    const loadServiceLogsByServiceId = async(monitoredServiceId: number): Promise<CheckLogResponse[]> => {
        try{
            setLoading(true);
            setError(null);

            const logs = await getRecentLogsByMonitoredServiceId(monitoredServiceId);
            setData(logs);

            return logs;
        }catch (err){
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Unknown error occurred");
            }
            throw err;
        }finally {
            setLoading(false);
        }
    }

    const loadAgentErrorLogs = async(agentId: number): Promise<CheckLogResponse[]> => {
        try{
            setLoading(true);
            setError(null);

            const logs = await getErrorLogsByAgentId(agentId);
            setData(logs);

            return logs;
        }catch (err){
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Unknown error occurred");
            }
            throw err;
        }finally {
            setLoading(false);
        }
    }

    return { data, loading, error, loadRecentLogs, loadServiceLogsByServiceKey, loadServiceLogsByServiceId, loadAgentErrorLogs};
}