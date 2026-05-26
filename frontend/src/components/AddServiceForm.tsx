import { useState, type ChangeEvent, type FormEvent } from "react";
import type { CreateMonitoredServiceRequest } from "../apis/servicesApi.ts";
import type { CheckMethod } from "../types/dashboard.ts";
import { useAgents } from "../hooks/useAgents.ts";

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

    const [errors, setErrors] = useState<Partial<Record<keyof AddServiceFormState, string>>>({});

    const {
        data: agents,
        loading: agentsLoading,
        error: agentsError,
    } = useAgents();

    function validateForm(): Partial<Record<keyof AddServiceFormState, string>> {
        const validationErrors: Partial<Record<keyof AddServiceFormState, string>> = {};

        if (formData.serviceKey.trim() === "") {
            validationErrors.serviceKey = "Service key is required";
        }

        if (formData.name.trim() === "") {
            validationErrors.name = "Name is required";
        }

        if (formData.url.trim() === "") {
            validationErrors.url = "URL is required";
        }

        if (formData.agentId.trim() === "") {
            validationErrors.agentId = "Agent is required";
        }

        return validationErrors;
    }

    function handleChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = event.target;

        setFormData((currentData) => ({
            ...currentData,
            [name]: value,
        }));
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});

        await addService({
            serviceKey: formData.serviceKey.trim(),
            name: formData.name.trim(),
            url: formData.url.trim(),
            checkMethod: formData.checkMethod,
            agentId: Number(formData.agentId),
        });

        setFormData({
            serviceKey: "",
            name: "",
            url: "",
            checkMethod: "HTTP_GET",
            agentId: "",
        });
    }

    return (
        <form className="AddServiceForm" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="serviceKey">Service Key</label>
                <input
                    id="serviceKey"
                    name="serviceKey"
                    type="text"
                    value={formData.serviceKey}
                    onChange={handleChange}
                    placeholder="auth-api"
                />
                {errors.serviceKey && <p className="form-error">{errors.serviceKey}</p>}
            </div>

            <div>
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Auth API"
                />
                {errors.name && <p className="form-error">{errors.name}</p>}
            </div>

            <div>
                <label htmlFor="url">URL</label>
                <input
                    id="url"
                    name="url"
                    type="text"
                    value={formData.url}
                    onChange={handleChange}
                    placeholder="http://localhost:8080/api/agents"
                />
                {errors.url && <p className="form-error">{errors.url}</p>}
            </div>

            <div>
                <label htmlFor="checkMethod">Check Method</label>
                <select
                    id="checkMethod"
                    name="checkMethod"
                    value={formData.checkMethod}
                    onChange={handleChange}
                >
                    <option value="HTTP_GET">HTTP_GET</option>
                    <option value="TCP">TCP</option>
                </select>
            </div>

            <div>
                <label htmlFor="agentId">Agent</label>
                <select
                    id="agentId"
                    name="agentId"
                    value={formData.agentId}
                    onChange={handleChange}
                    disabled={agentsLoading || agents.length === 0}
                >
                    <option value="" disabled>
                        {agentsLoading ? "Loading agents..." : "Select an agent"}
                    </option>

                    {agents.map((agent) => (
                        <option key={agent.id} value={agent.id}>
                            {agent.name} #{agent.id}
                        </option>
                    ))}
                </select>
                {errors.agentId && <p className="form-error">{errors.agentId}</p>}
                {agentsError && <p className="form-error">{agentsError}</p>}
            </div>

            <button type="submit" disabled={agentsLoading || agents.length === 0}>
                Create Service
            </button>
        </form>
    );
}