import type {CheckLogResponse} from "../types/dashboard.ts";

type RecentCheckLogProps = {
    logsData: CheckLogResponse[];
};
export function RecentLogs({logsData}: RecentCheckLogProps) {
    return (
        <div className="RecentLogs">
            <h1 className="logs-title">Recent Check Logs</h1>
            <div className="table-responsive">
                <table>
                    <thead>
                    <tr>
                        <th>Monitored Service ID</th>
                        <th>Service Key</th>
                        <th>Service Name</th>
                        <th>Status</th>
                        <th>http Status</th>
                        <th>Latency</th>
                        <th>Error</th>
                        <th>Checked At</th>
                        <th>Received At</th>
                    </tr>
                    </thead>
                    <tbody>
                    {logsData.map((log) => (

                        <tr key={log.id}>
                            <td>{log.monitoredServiceId}</td>
                            <td>{log.serviceKey}</td>
                            <td>{log.serviceName}</td>
                            <td>{log.status}</td>
                            <td>{log.httpStatusCode}</td>
                            <td>{log.latencyMs}</td>
                            <td>{log.errorMessage || "-"}</td>
                            <td>{log.checkedAt}</td>
                            <td>{log.receivedAt}</td>

                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}