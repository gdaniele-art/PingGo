import type {AgentResponse, MonitoredServiceResponse} from "../types/dashboard.ts";

type MetricsSummaryProps = {
    services: MonitoredServiceResponse[];
    agents: AgentResponse[];
}
export function MetricsSummary({services, agents}: MetricsSummaryProps) {
    const agentsCount = agents.length;
    const totalServices = services.length;
    const onlineAgents = agents.filter(agent => agent.enabled).length;
    const offlineAgents = agents.length - onlineAgents;
    return (
        <section id="metrics-summary">
            <h2>Metrics Summary</h2>

            <div className="metric-grid">
                <article>
                    <h3>Metrics Summary</h3>
                    <p>Total Agents: {agentsCount}</p>
                    <p>Online Agents: {onlineAgents}</p>
                    <p>Offline Agents: {offlineAgents}</p>
                    <p>Total Services: {totalServices}</p>

                </article>
            </div>
        </section>
    );
}