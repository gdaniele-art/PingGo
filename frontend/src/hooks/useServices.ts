import {useEffect, useState} from "react";
import {
    type CreateMonitoredServiceRequest,
    createService,
    getAllServices,
    updateService,
    type UpdateMonitoredServiceRequest,
} from "../apis/servicesApi.ts";
import type {MonitoredServiceResponse} from "../types/dashboard.ts";


export function useServices() {
    const[data,setData] = useState<MonitoredServiceResponse[]>([]);
    const[loading,setLoading] = useState<boolean>(true);
    const[creating,setCreating] = useState<boolean>(false);
    const[updating,setUpdating] = useState<boolean>(false);
    const[error,setError] = useState<string | null>(null);
    const[updateError,setUpdateError] = useState<string | null>(null);

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

    const editService = async(serviceId: number, payload: UpdateMonitoredServiceRequest): Promise<MonitoredServiceResponse> => {
        try{
            setUpdating(true);
            setUpdateError(null);

            const updatedService = await updateService(serviceId, payload);

            setData((prevServices) =>
                prevServices.map((service) =>
                    service.id === updatedService.id ? updatedService : service
                )
            );

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

    return { data, loading, creating, updating, error, updateError, addService, editService};
}
