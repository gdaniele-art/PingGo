import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import type { CreateMonitoredServiceRequest } from "../apis/servicesApi.ts";
import type {CheckMethod} from "../types/dashboard.ts";


export type AddServiceFormState = {
    serviceKey: string;
    name: string;
    url: string;
    checkMethod: CheckMethod;
    agentId: string;
};

type AddServiceFormProps = {
    addService: (payload: CreateMonitoredServiceRequest) => void | Promise<void>;
};

export function AddServiceForm({ addService }: AddServiceFormProps) {
    const [formData, setFormData] = useState<AddServiceFormState>({
        serviceKey: "",
        name: "",
        url: "",
        checkMethod: "HTTP_GET",
        agentId: "",
    });

    const handleChange = (
        event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = event.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const payload: CreateMonitoredServiceRequest = {
            serviceKey: formData.serviceKey,
            name: formData.name,
            url: formData.url,
            checkMethod: formData.checkMethod,
            agentId: Number(formData.agentId),
        };

        addService(payload);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="serviceKey"
                value={formData.serviceKey}
                onChange={handleChange}
                placeholder="Service Key"/>

            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"/>

            <input
                type="text"
                name="url"
                value={formData.url}
                onChange={handleChange}
                placeholder="URL"/>

            <select
                name="checkMethod"
                value={formData.checkMethod}
                onChange={handleChange}>
                <option value="HTTP_GET">HTTP GET</option>
                <option value="TCP">TCP</option>
                <option value="PING">PING</option>
            </select>

            <input
                type="number"
                name="agentId"
                value={formData.agentId}
                onChange={handleChange}
                placeholder="Agent ID"/>

            <button type="submit">
                Save Service
            </button>
        </form>
    );
}