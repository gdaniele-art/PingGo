import type { MonitoredServiceResponse } from "../types/dashboard.ts";
import { StatusBadge } from "./StatusBadge.tsx";
import { Link } from "react-router-dom";

type ServicesTableProps = {
    services: MonitoredServiceResponse[];
};

export function ServicesTable({ services }: ServicesTableProps) {
    return (
        <div className="ServicesTable">
            <h1 className="services-table-title">Services</h1>

            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Service Key</th>
                    <th>URL</th>
                    <th>Method</th>
                    <th>Agent</th>
                    <th>Enabled</th>
                </tr>
                </thead>

                <tbody>
                {services.map((service) => (
                    <tr key={service.id}>
                        <td>
                            <Link
                                className="table-link"
                                to={`/services/${encodeURIComponent(service.serviceKey)}`}>
                                {service.name}
                            </Link>
                        </td>

                        <td>{service.serviceKey}</td>
                        <td>{service.url}</td>
                        <td>{service.checkMethod}</td>

                        <td>
                            <Link
                                className="table-link"
                                to={`/agents/${service.agentId}`}>
                                {service.agentName}
                            </Link>
                        </td>

                        <td>
                            <StatusBadge value={service.enabled} />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}