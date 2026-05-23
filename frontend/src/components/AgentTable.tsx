import type { AgentResponse, MonitoredServiceResponse } from "../types/dashboard.ts";
import { StatusBadge } from "./StatusBadge.tsx";

type AgentTableProps = {
    agents: AgentResponse[];
    services: MonitoredServiceResponse[];
};

export function AgentTable({ agents, services }: AgentTableProps) {
    return (
        <div className="AgentTable">
            <h1 className="agent-table-title">Agents</h1>

            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Services Count</th>
                    <th>Services</th>
                </tr>
                </thead>

                <tbody>
                {agents.map((agent) => {
                    const agentServices = services.filter(
                        (service) => service.agentId === agent.id
                    );

                    const serviceNames = agentServices
                        .map((service) => service.name)
                        .join(", ");

                    return (
                        <tr key={agent.id}>
                            <td>{agent.name}</td>
                            <td>{agent.description}</td>
                            <td>
                                <StatusBadge value={agent.enabled} />
                            </td>
                            <td>{agentServices.length}</td>
                            <td>{serviceNames || "-"}</td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
}