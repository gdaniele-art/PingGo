import { useMemo, useState } from "react";
import { useAgents } from "../hooks/useAgents.ts";
import { useServices } from "../hooks/useServices.ts";
import { AgentTable } from "../components/AgentTable.tsx";
import { AddAgentForm } from "../components/AddAgentForm.tsx";

export function AgentsPage() {
    const {
        data: agents,
        loading: agentsLoading,
        error: agentsError,
        addAgent,
        creating,
    } = useAgents();

    const {
        data: services,
        loading: servicesLoading,
        error: servicesError,
    } = useServices();

    const [searchTerm, setSearchTerm] = useState<string>("");
    const [showForm, setShowForm] = useState<boolean>(false);

    const loading = agentsLoading || servicesLoading;
    const error = agentsError || servicesError;

    const filteredAgents = useMemo(() => {
        const normalizedSearch = searchTerm.trim().toLowerCase();

        if (normalizedSearch === "") {
            return agents;
        }

        return agents.filter((agent) => {
            const agentServices = services.filter(
                (service) => service.agentId === agent.id
            );

            return (
                agent.name.toLowerCase().includes(normalizedSearch) ||
                (agent.description ?? "").toLowerCase().includes(normalizedSearch) ||
                agentServices.some((service) =>
                    service.name.toLowerCase().includes(normalizedSearch) ||
                    service.serviceKey.toLowerCase().includes(normalizedSearch) ||
                    service.url.toLowerCase().includes(normalizedSearch) ||
                    service.checkMethod.toLowerCase().includes(normalizedSearch)
                )
            );
        });
    }, [agents, services, searchTerm]);

    if (loading) {
        return <p>Loading agents...</p>;
    }

    if (error) {
        return <p>Error loading agents: {error}</p>;
    }

    return (
        <main className="AgentsPage">
            <header className="page-header">
                <div>
                    <h1>Agents</h1>
                    <p>List of agents currently connected to PingGo.</p>
                </div>

                <button
                    className="primary-button"
                    type="button"
                    onClick={() => setShowForm((prev) => !prev)}
                    disabled={creating}>
                    {showForm ? "Cancel" : "Add Agent"}
                </button>
            </header>

            {showForm && (
                <section className="add-agent-section">
                    <AddAgentForm
                        addAgent={async (payload) => {
                            await addAgent(payload);
                            setShowForm(false);
                        }}/>
                </section>
            )}

            <section className="page-toolbar-agents">
                <input
                    className="search-input"
                    type="text"
                    placeholder="Search by name, description, service name, service key, URL, or method..."
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                />

                <span className="results-count">
                    {filteredAgents.length} result{filteredAgents.length === 1 ? "" : "s"}
                </span>
            </section>

            <AgentTable agents={filteredAgents} services={services} />
        </main>
    );
}