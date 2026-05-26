import { useParams } from "react-router-dom";
import { useAgent } from "../hooks/useAgent.ts";
import { ServicesTable } from "../components/ServicesTable.tsx";

export function AgentDetailPage() {
    const { agentId } = useParams();
    const parsedAgentId = Number(agentId);

    const {
        data: agent,
        services,
        loading,
        error,
        updating,
        updateError,
        toggleAgentStatus,
    } = useAgent(parsedAgentId);

    if (Number.isNaN(parsedAgentId)) {
        return <p>Invalid agent id</p>;
    }

    if (loading) {
        return <p>Loading agent...</p>;
    }

    if (error) {
        return <p>Error loading agent: {error}</p>;
    }

    if (!agent) {
        return <p>Agent not found</p>;
    }

    return (
        <main className="AgentDetailPage">
            <header className="page-header">
                <div>
                    <h1>{agent.name}</h1>
                    <p>{agent.description || "No description available."}</p>
                </div>

                <div className="agent-actions">
                    <span className={agent.enabled ? "status-up" : "status-down"}>
                        {agent.enabled ? "Enabled" : "Disabled"}
                    </span>

                    <button
                        className="primary-button"
                        type="button"
                        onClick={toggleAgentStatus}
                        disabled={updating}>
                        {updating
                            ? "Updating..."
                            : agent.enabled
                                ? "Disable Agent"
                                : "Enable Agent"}
                    </button>
                </div>
            </header>

            {updateError && <p className="form-error">{updateError}</p>}

            <section className="agent-detail-summary">
                <article className="summary-card">
                    <h2>Agent ID</h2>
                    <p>{agent.id}</p>
                </article>

                <article className="summary-card">
                    <h2>Status</h2>
                    <p>{agent.enabled ? "Enabled" : "Disabled"}</p>
                </article>

                <article className="summary-card">
                    <h2>Assigned Services</h2>
                    <p>{services.length}</p>
                </article>
            </section>

            <section className="agent-services-section">
                <div className="section-header">
                    <h2>Services assigned to this agent</h2>
                    <p>These are the services currently linked to this agent.</p>
                </div>

                <ServicesTable services={services} />
            </section>
        </main>
    );
}