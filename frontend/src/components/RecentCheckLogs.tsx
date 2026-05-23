import type { CheckLogResponse } from "../types/dashboard.ts";
import { StatusBadge } from "./StatusBadge.tsx";
import { formatDateTime, formatErrorMessage } from "../utils/formatters.ts";

type RecentCheckLogsProps = {
    logs: CheckLogResponse[];
};

export function RecentLogs({ logs }: RecentCheckLogsProps) {
    return (
        <div className="RecentLogs">
            <h1 className="logs-title">Recent Check Logs</h1>

            <table>
                <thead>
                <tr>
                    <th>Service</th>
                    <th>Status</th>
                    <th>HTTP Status</th>
                    <th>Latency</th>
                    <th>Error</th>
                    <th>Checked At</th>
                </tr>
                </thead>

                <tbody>
                {logs.map((log) => (
                    <tr key={log.id}>
                        <td>{log.serviceName}</td>
                        <td>
                            <StatusBadge value={log.status} />
                        </td>
                        <td>{log.httpStatusCode}</td>
                        <td>{log.latencyMs} ms</td>
                        <td>{formatErrorMessage(log.errorMessage)}</td>
                        <td>{formatDateTime(log.checkedAt)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}