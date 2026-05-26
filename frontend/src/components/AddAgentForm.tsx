import { useState, type ChangeEvent, type FormEvent } from "react";
import type { CreateAgentRequest } from "../apis/agentsApi.ts";

type AddAgentFormState = {
    name: string;
    description: string;
};

type AddAgentFormProps = {
    addAgent: (payload: CreateAgentRequest) => void | Promise<void>;
};

export function AddAgentForm({ addAgent }: AddAgentFormProps) {
    const [formData, setFormData] = useState<AddAgentFormState>({
        name: "",
        description: "",
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

        await addAgent({
            name: formData.name.trim(),
            description: formData.description.trim(),
        });

        setFormData({
            name: "",
            description: "",
        });
    }

    return (
        <form className="AddAgentForm" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="main-agent"/>
            </div>

            <div>
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Internal network monitoring agent"/>
            </div>

            {error && <p className="form-error">{error}</p>}

            <button type="submit">Create Agent</button>
        </form>
    );
}