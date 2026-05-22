import {StatusBadge} from "./StatusBadge.tsx";

type CheckLog = {
    time: string;
    service: string;
    status: "UP" | "DOWN";
    latency: string;
    error: string;
};
const logsData: CheckLog[] = [
    { time: "10:32", service: "auth",       status: "UP",   latency: "20ms",  error: "-" },
    { time: "10:31", service: "auth2",      status: "DOWN", latency: "220ms", error: "timeout" },
    { time: "10:30", service: "auth3",      status: "UP",   latency: "20ms",  error: "-" },
    { time: "10:29", service: "ping-api",   status: "UP",   latency: "15ms",  error: "-" },
    { time: "10:28", service: "auth4",      status: "DOWN", latency: "0ms",   error: "connection refused" },
    { time: "10:27", service: "ping-ui",    status: "UP",   latency: "45ms",  error: "-" },
    { time: "10:26", service: "auth",       status: "UP",   latency: "22ms",  error: "-" },
    { time: "10:25", service: "auth2",      status: "DOWN", latency: "220ms", error: "timeout" },
    { time: "10:24", service: "ping-api",   status: "UP",   latency: "12ms",  error: "-" },
    { time: "10:23", service: "auth3",      status: "UP",   latency: "25ms",  error: "-" }
];
export function RecentLogs() {
    return (
        <div className="RecentLogs">
            {/* El título con el cian brillante que configuramos antes */}
            <h1 className="logs-title">Recent Check Logs</h1>

            <div className="table-responsive">
                <table>
                    <thead>
                    <tr>
                        <th>Time</th>
                        <th>Service</th>
                        <th>Status</th>
                        <th>Latency</th>
                        <th>Error</th>
                    </tr>
                    </thead>
                    <tbody>
                    {logsData.map((log, index) => (

                        <tr key={`${log.service}-${log.time}-${index}`}>
                            <td className="log-time">{log.time}</td>
                            <td className="log-service">{log.service}</td>
                            <td>

                                <StatusBadge status={log.status} />
                            </td>
                            <td>{log.latency}</td>

                            <td className={log.error !== "-" ? "error-text" : "no-error"}>
                                {log.error}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}