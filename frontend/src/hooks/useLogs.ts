import {useEffect, useState} from "react";
import type {CheckLogResponse} from "../types/dashboard.ts";
import {getRecentLogs} from "../apis/checkLogsAPI.ts";


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

    return { data, loading, error };
}