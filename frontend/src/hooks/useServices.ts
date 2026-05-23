import {useEffect, useState} from "react";
import {type CreateMonitoredServiceRequest, createService, getAllServices} from "../apis/servicesApi.ts";
import type {MonitoredServiceResponse} from "../types/dashboard.ts";


export function useServices() {
    const[data,setData] = useState<MonitoredServiceResponse[]>([]);
    const[loading,setLoading] = useState<boolean>(true);
    const [creating, setCreating] = useState<boolean>(false);
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

    const addService = async(payload: CreateMonitoredServiceRequest): Promise<MonitoredServiceResponse> => {
        try{
            setCreating(true);
            setError(null);

            const createdService = await createService(payload);

            setData((prevServices) => [createdService, ...prevServices]);

            return createdService;
        }catch (err){
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Unknown error occurred");
            }
            throw err;
        }finally {
            setCreating(false);
        }

    }

    return { data, loading, creating, error, addService};
}

