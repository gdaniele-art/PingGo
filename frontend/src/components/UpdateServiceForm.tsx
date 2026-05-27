import { useState, type ChangeEvent, type FormEvent } from "react";
import type { UpdateMonitoredServiceRequest } from "../apis/servicesApi.ts";
import type { CheckMethod, MonitoredServiceResponse } from "../types/dashboard.ts";
import { useAgents } from "../hooks/useAgents.ts";

type UpdateServiceFormState = {
    name: string;
    url: string;
    checkMethod: CheckMethod;
    agentId: string;
};

type UpdateServiceFormProps = {
    service: MonitoredServiceResponse;
    updateService: (payload: UpdateMonitoredServiceRequest) => void | Promise<void>;
    onCancel: () => void;
};

export function UpdateServiceForm({ service, updateService, onCancel }: UpdateServiceFormProps) {
    const [formData, setFormData] = useState<UpdateServiceFormState>({
        name: service.name,
        url: service.url,
        checkMethod: service.checkMethod,
        agentId: String(service.agentId),
    });

    const [errors, setErrors] = useState<Partial<Record<keyof UpdateServiceFormState, string>>>({});

    const {
        data: agents,
        loading: agentsLoading,
        error: agentsError,
    } = useAgents();

    function validateForm(): Partial<Record<keyof UpdateServiceFormState, string>> {
        const validationErrors: Partial<Record<keyof UpdateServiceFormState, string>> = {};

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

        await updateService({
            name: formData.name.trim(),
            url: formData.url.trim(),
            checkMethod: formData.checkMethod,
            agentId: Number(formData.agentId),
        });
    }

    return (
        <form className="AddServiceForm" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="update-service-name">Name</label>
                <input
                    id="update-service-name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                />
                {errors.name && <p className="form-error">{errors.name}</p>}
            </div>

            <div>
                <label htmlFor="update-service-url">URL</label>
                <input
                    id="update-service-url"
                    name="url"
                    type="text"
                    value={formData.url}
                    onChange={handleChange}
                />
                {errors.url && <p className="form-error">{errors.url}</p>}
            </div>

            <div>
                <label htmlFor="update-service-checkMethod">Check Method</label>
                <select
                    id="update-service-checkMethod"
                    name="checkMethod"
                    value={formData.checkMethod}
                    onChange={handleChange}
                >
                    <option value="HTTP_GET">HTTP_GET</option>
                    <option value="TCP">TCP</option>
                    <option value="PING">PING</option>
                </select>
            </div>

            <div>
                <label htmlFor="update-service-agentId">Agent</label>
                <select
                    id="update-service-agentId"
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

            <div className="form-actions">
                <button type="submit" disabled={agentsLoading || agents.length === 0}>
                    Save Changes
                </button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </div>
        </form>
    );
}
