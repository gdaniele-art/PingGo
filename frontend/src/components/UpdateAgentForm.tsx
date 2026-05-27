import { useState, type ChangeEvent, type FormEvent } from "react";
import type { UpdateAgentRequest } from "../apis/agentsApi.ts";
import type { AgentResponse } from "../types/dashboard.ts";

type UpdateAgentFormState = {
    name: string;
    description: string;
};

type UpdateAgentFormProps = {
    agent: AgentResponse;
    updateAgent: (payload: UpdateAgentRequest) => void | Promise<void>;
    onCancel: () => void;
};

export function UpdateAgentForm({ agent, updateAgent, onCancel }: UpdateAgentFormProps) {
    const [formData, setFormData] = useState<UpdateAgentFormState>({
        name: agent.name,
        description: agent.description ?? "",
    });

    const [error, setError] = useState<string>("");

    function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;

        setFormData((currentData) => ({
            ...currentData,
            [name]: value,
        }));
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (formData.name.trim() === "") {
            setError("Agent name is required");
            return;
        }

        setError("");

        await updateAgent({
            name: formData.name.trim(),
            description: formData.description.trim(),
        });
    }

    return (
        <form className="AddAgentForm" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="update-agent-name">Name</label>
                <input
                    id="update-agent-name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor="update-agent-description">Description</label>
                <textarea
                    id="update-agent-description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />
            </div>

            {error && <p className="form-error">{error}</p>}

            <div className="form-actions">
                <button type="submit">Save Changes</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </div>
        </form>
    );
}
