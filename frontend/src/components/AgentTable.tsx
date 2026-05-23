
import type {AgentResponse} from "../types/dashboard.ts";

type AgebtTableProps = {
    agents: AgentResponse[];
};
export function AgentTable({agents}: AgebtTableProps) {
    return (
        <div className={"AgentTable"}>
            <h1 className="agent-table-title">Agent List</h1>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Enabled</th>
                    <th>Services Count</th>
                    <th>Services</th>


                </tr>
                </thead>
                <tbody>
                {
                    agents.map((agent) => (
                        <tr key={agent.id}>
                            <td>{agent.name}</td>
                            <td>{agent.description}</td>
                            <td>{agent.enabled ? 'ONLINE' : 'OFFLINE'}</td>
                            <td>{agent.services.length}</td>
                            <td>{agent.services.join(', ')}</td>

                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>

    );
}