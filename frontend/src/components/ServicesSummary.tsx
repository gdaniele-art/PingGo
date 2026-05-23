import type { MonitoredServiceResponse } from "../types/dashboard.ts";
import { StatusBadge } from "./StatusBadge.tsx";

type ServicesSummaryProps = {
    services: MonitoredServiceResponse[];
    maxItems?: number;
};

export function ServicesSummary({ services, maxItems = 5 }: ServicesSummaryProps) {
    const visibleServices = services.slice(0, maxItems);
    const hiddenCount = Math.max(services.length - maxItems, 0);

    return (
        <section className="summary-card">
            <div className="summary-card-header">
                <h2>Services Overview</h2>
                <span>{services.length} total</span>
            </div>

            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Method</th>
                    <th>Agent</th>
                    <th>Status</th>
                </tr>
                </thead>

                <tbody>
                {visibleServices.map((service) => (
                    <tr key={service.id}>
                        <td>{service.name}</td>
                        <td>{service.checkMethod}</td>
                        <td>{service.agentName}</td>
                        <td>
                            <StatusBadge value={service.enabled} />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {hiddenCount > 0 && (
                <p className="summary-footer">
                    + {hiddenCount} more services
                </p>
            )}
        </section>
    );
}