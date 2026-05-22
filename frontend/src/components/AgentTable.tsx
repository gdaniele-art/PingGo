import {StatusBadge} from "./StatusBadge.tsx";

type AgentStatus = "ONLINE" | "OFFLINE";

type Agent = {
    name: string;
    status: AgentStatus;
    services: number;
};
const agents: Agent[] = [
    { name: "auth-api", status: "ONLINE", services: 1 },
    { name: "ping-api", status: "OFFLINE" , services: 2},
    { name: "ping-ui",  status: "ONLINE" , services: 3 }
];
export function AgentTable() {
    return (
        <div className="AgentTable">
            <h1 className="agent-table-title">Agent List</h1>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Services</th>
                </tr>
                </thead>
                <tbody>
                {
                    agents.map((agent) => (
                        <tr key={agent.name}>
                            <td>{agent.name}</td>
                            <td>
                                <StatusBadge status={agent.status}/>
                            </td>
                            <td>{agent.services}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>

    );
}