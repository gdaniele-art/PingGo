import type { AgentResponse, MonitoredServiceResponse } from "../types/dashboard.ts";
import { StatusBadge } from "./StatusBadge.tsx";

type AgentsSummaryProps = {
    agents: AgentResponse[];
    services: MonitoredServiceResponse[];
    maxItems?: number;
    maxServiceNames?: number;
};

export function AgentsSummary({
                                  agents,
                                  services,
                                  maxItems = 3,
                                  maxServiceNames = 3,
                              }: AgentsSummaryProps) {
    const visibleAgents = agents.slice(0, maxItems);
    const hiddenCount = Math.max(agents.length - maxItems, 0);

    return (
        <section className="summary-card">
            <div className="summary-card-header">
                <h2>Agents Overview</h2>
                <span>{agents.length} total</span>
            </div>

            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Services</th>
                    <th>Service Names</th>
                </tr>
                </thead>

                <tbody>
                {visibleAgents.map((agent) => {
                    const agentServices = services.filter(
                        (service) => service.agentId === agent.id
                    );

                    const visibleServiceNames = agentServices
                        .slice(0, maxServiceNames)
                        .map((service) => service.name)
                        .join(", ");

                    const extraServicesCount = Math.max(
                        agentServices.length - maxServiceNames,
                        0
                    );

                    return (
                        <tr key={agent.id}>
                            <td>{agent.name}</td>
                            <td>
                                <StatusBadge value={agent.enabled} />
                            </td>
                            <td>{agentServices.length}</td>
                            <td>
                                {visibleServiceNames || "-"}
                                {extraServicesCount > 0 && ` +${extraServicesCount} more`}
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>

            {hiddenCount > 0 && (
                <p className="summary-footer">
                    + {hiddenCount} more agents
                </p>
            )}
        </section>
    );
}