import type {MonitoredServiceResponse} from "../types/dashboard.ts";

type ServicesTableProps = {
    services: MonitoredServiceResponse[];
};

export function ServicesTable({services}: ServicesTableProps) {
    return (
        <div className={"ServicesTable"}>
            <h1>Services List</h1>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Service Key</th>
                    <th>URL</th>
                    <th>Check Method</th>
                    <th>Enabled</th>
                    <th>Agent</th>
                </tr>
                </thead>
                <tbody>
                {
                    services.map((service) => (
                        <tr key={service.id}>
                            <td>{service.name}</td>
                            <td>{service.serviceKey}</td>
                            <td>{service.url}</td>
                            <td>{service.checkMethod}</td>
                            <td>{service.enabled ? "Enabled" : "Disabled"}</td>
                            <td>{service.agentName}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    )
}