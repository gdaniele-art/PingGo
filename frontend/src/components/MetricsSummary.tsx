import type { AgentResponse, MonitoredServiceResponse } from "../types/dashboard.ts";

type MetricsSummaryProps = {
    agents: AgentResponse[];
    services: MonitoredServiceResponse[];
};

export function MetricsSummary({ agents, services }: MetricsSummaryProps) {
    const totalAgents = agents.length;
    const onlineAgents = agents.filter((agent) => agent.enabled).length;
    const offlineAgents = totalAgents - onlineAgents;

    const totalServices = services.length;
    const onlineServices = services.filter((service) => service.enabled).length;
    const offlineServices = totalServices - onlineServices;

    return (
        <section className="metrics-section">
            <div className="section-header">
                <h2>Metrics Summary</h2>
                <p>Current overview of agents and monitored services.</p>
            </div>

            <div className="metric-grid">
                <article className="metric-card">
                    <span className="metric-label">Total Agents</span>
                    <strong>{totalAgents}</strong>
                </article>

                <article className="metric-card">
                    <span className="metric-label">Online Agents</span>
                    <strong>{onlineAgents}</strong>
                </article>

                <article className="metric-card">
                    <span className="metric-label">Offline Agents</span>
                    <strong>{offlineAgents}</strong>
                </article>

                <article className="metric-card">
                    <span className="metric-label">Total Services</span>
                    <strong>{totalServices}</strong>
                </article>

                <article className="metric-card">
                    <span className="metric-label">Enabled Services</span>
                    <strong>{onlineServices}</strong>
                </article>

                <article className="metric-card">
                    <span className="metric-label">Disabled Services</span>
                    <strong>{offlineServices}</strong>
                </article>
            </div>
        </section>
    );
}