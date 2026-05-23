import {useEffect, useState} from "react";
import {getAllServices} from "../apis/servicesApi.ts";
import type {MonitoredServiceResponse} from "../types/dashboard.ts";

export function useServices() {
    const[data,setData] = useState<MonitoredServiceResponse[]>([]);
    const[loading,setLoading] = useState<boolean>(true);
    const[error,setError] = useState<string | null>(null);

    useEffect(() => {
        const getData = async () => {
            try {
                setLoading(true);
                setError(null);

                const res = await getAllServices();
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