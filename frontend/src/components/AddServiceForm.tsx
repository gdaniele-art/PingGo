import { useState, type ChangeEvent, type FormEventHandler } from "react";
import type { CreateMonitoredServiceRequest } from "../apis/servicesApi.ts";
import type { CheckMethod } from "../types/dashboard.ts";

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

    const [errors, setErrors] = useState<
        Partial<Record<keyof AddServiceFormState, string>>
    >({});

    const [creating, setCreating] = useState(false);

    function validateForm(): Partial<Record<keyof AddServiceFormState, string>> {
        const newErrors: Partial<Record<keyof AddServiceFormState, string>> = {};

        const normalizedServiceKey = formData.serviceKey.trim();
        const normalizedName = formData.name.trim();
        const normalizedUrl = formData.url.trim();
        const normalizedAgentId = formData.agentId.trim();

        if (normalizedServiceKey === "") {
            newErrors.serviceKey = "Service key is required";
        }

        if (normalizedName === "") {
            newErrors.name = "Name is required";
        }

        if (normalizedUrl === "") {
            newErrors.url = "URL is required";
        } else if (
            formData.checkMethod === "HTTP_GET" &&
            !normalizedUrl.startsWith("http://") &&
            !normalizedUrl.startsWith("https://")
        ) {
            newErrors.url = "URL must start with http:// or https://";
        }

        const agentId = Number(normalizedAgentId);

        if (normalizedAgentId === "") {
            newErrors.agentId = "Agent ID is required";
        } else if (Number.isNaN(agentId) || agentId <= 0) {
            newErrors.agentId = "Agent ID must be a positive number";
        }

        return newErrors;
    }

    const handleChange = (
        event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = event.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();

        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const payload: CreateMonitoredServiceRequest = {
            serviceKey: formData.serviceKey.trim(),
            name: formData.name.trim(),
            url: formData.url.trim(),
            checkMethod: formData.checkMethod,
            agentId: Number(formData.agentId),
        };

        try {
            setCreating(true);
            setErrors({});

            await addService(payload);

            setFormData({
                serviceKey: "",
                name: "",
                url: "",
                checkMethod: "HTTP_GET",
                agentId: "",
            });
        } finally {
            setCreating(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="serviceKey"
                value={formData.serviceKey}
                onChange={handleChange}
                placeholder="Service Key"
            />
            {errors.serviceKey && (
                <p className="form-error">{errors.serviceKey}</p>
            )}

            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
            />
            {errors.name && (
                <p className="form-error">{errors.name}</p>
            )}

            <input
                type="text"
                name="url"
                value={formData.url}
                onChange={handleChange}
                placeholder="URL"
            />
            {errors.url && (
                <p className="form-error">{errors.url}</p>
            )}

            <select
                name="checkMethod"
                value={formData.checkMethod}
                onChange={handleChange}
            >
                <option value="HTTP_GET">HTTP GET</option>
                <option value="TCP">TCP</option>
                <option value="PING">PING</option>
            </select>

            <input
                type="number"
                name="agentId"
                value={formData.agentId}
                onChange={handleChange}
                placeholder="Agent ID"
            />
            {errors.agentId && (
                <p className="form-error">{errors.agentId}</p>
            )}

            <button type="submit" disabled={creating}>
                {creating ? "Saving..." : "Save Service"}
            </button>
        </form>
    );
}