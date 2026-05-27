import {useEffect, useState} from "react";
import {
    disableService,
    enableService,
    getServiceByServiceKey,
    getServiceRecentLogs,
    updateService,
    type UpdateMonitoredServiceRequest,
} from "../apis/servicesApi.ts";
import type {CheckLogResponse, MonitoredServiceResponse} from "../types/dashboard.ts";

export function useService(serviceKey: string) {
    const[data,setData] = useState<MonitoredServiceResponse | null>(null);
    const[logs,setLogs] = useState<CheckLogResponse[]>([]);
    const[loading,setLoading] = useState<boolean>(true);
    const[updating,setUpdating] = useState<boolean>(false);
    const[error,setError] = useState<string | null>(null);
    const[updateError,setUpdateError] = useState<string | null>(null);

    useEffect(() => {
        const getData = async () => {
            try {
                setLoading(true);
                setError(null);

                const serviceRes = await getServiceByServiceKey(serviceKey);
                const logsRes = await getServiceRecentLogs(serviceKey);

                setData(serviceRes);
                setLogs(logsRes);
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
    }, [serviceKey]);

    const toggleServiceStatus = async(): Promise<MonitoredServiceResponse | undefined> => {
        if (!data) {
            return;
        }

        try{
            setUpdating(true);
            setUpdateError(null);

            const updatedService = data.enabled
                ? await disableService(data.id)
                : await enableService(data.id);

            setData(updatedService);

            return updatedService;
        }catch (err){
            if (err instanceof Error) {
                setUpdateError(err.message);
            } else {
                setUpdateError("Unknown error occurred");
            }
            throw err;
        }finally {
            setUpdating(false);
        }

    }

    const editService = async(payload: UpdateMonitoredServiceRequest): Promise<MonitoredServiceResponse | undefined> => {
        if (!data) {
            return;
        }

        try{
            setUpdating(true);
            setUpdateError(null);

            const updatedService = await updateService(data.id, payload);

            setData(updatedService);

            return updatedService;
        }catch (err){
            if (err instanceof Error) {
                setUpdateError(err.message);
            } else {
                setUpdateError("Unknown error occurred");
            }
            throw err;
        }finally {
            setUpdating(false);
        }
    }

    return { data, logs, loading, updating, error, updateError, toggleServiceStatus, editService};
}
