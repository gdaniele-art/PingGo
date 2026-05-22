import {StatusBadge} from "./StatusBadge.tsx";
type ServiceStatus = "UP" | "DOWN";

type Service = {
    name: string;
    status: ServiceStatus;
    latency: string;
    HTTPStatus: number;
    agent: string;
    lastCheck: string;
};
const services: Service[] = [{name: "auth",status: "UP",latency:"20Ms",HTTPStatus: 202,
    agent:"auth-api",lastCheck: "2 min ago"}, {name: "auth2",status: "DOWN",latency:"220Ms",HTTPStatus: 0,
    agent:"authux-api",lastCheck: "5 min ago"}, {name: "auth3",status: "UP",latency:"20Ms",HTTPStatus: 202,
    agent:"auth-api",lastCheck: "2 min ago"}, {name: "auth4",status: "DOWN",latency:"220Ms",HTTPStatus: 0,
    agent:"authux-api",lastCheck: "5 min ago"}
]
export function ServicesTable() {
    return (
        <div className={"ServicesTable"}>
            <h1>Services List</h1>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Latency</th>
                    <th>HTTP Status</th>
                    <th>Agent</th>
                    <th>Last Check</th>
                </tr>
                </thead>
                <tbody>
                {
                    services.map((service) => (
                        <tr key={service.name}>
                            <td>{service.name}</td>
                            <td>
                                <StatusBadge status={service.status} />
                            </td>
                            <td>{service.latency}</td>
                            <td>{service.HTTPStatus}</td>
                            <td>{service.agent}</td>
                            <td>{service.lastCheck}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    )
}