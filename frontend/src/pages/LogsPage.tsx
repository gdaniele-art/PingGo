import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useLogs } from "../hooks/useLogs.ts";

type LogMode = "RECENT" | "SERVICE_KEY_HISTORY" | "SERVICE_ID_HISTORY" | "AGENT_ERRORS";
type StatusFilter = "ALL" | "UP" | "DOWN" | "UNKNOWN";

export function LogsPage() {
    const {
        data: logs,
        loading,
        error,
        loadRecentLogs,
        loadServiceLogsByServiceKey,
        loadServiceLogsByServiceId,
        loadAgentErrorLogs,
    } = useLogs();

    const [searchTerm, setSearchTerm] = useState<string>("");
    const [statusFilter, setStatusFilter] = useState<StatusFilter>("ALL");
    const [mode, setMode] = useState<LogMode>("RECENT");
    const [serviceKey, setServiceKey] = useState<string>("");
    const [monitoredServiceId, setMonitoredServiceId] = useState<string>("");
    const [agentId, setAgentId] = useState<string>("");

    const filteredLogs = useMemo(() => {
        const normalizedSearch = searchTerm.trim().toLowerCase();

        return logs.filter((log) => {
            const matchesStatus =
                statusFilter === "ALL" || log.status === statusFilter;

            const matchesSearch =
                normalizedSearch === "" ||
                log.serviceName.toLowerCase().includes(normalizedSearch) ||
                log.serviceKey.toLowerCase().includes(normalizedSearch) ||
                log.status.toLowerCase().includes(normalizedSearch) ||
                String(log.httpStatusCode).includes(normalizedSearch) ||
                String(log.latencyMs).includes(normalizedSearch) ||
                (log.errorMessage ?? "").toLowerCase().includes(normalizedSearch);

            return matchesStatus && matchesSearch;
        });
    }, [logs, searchTerm, statusFilter]);

    async function handleLoadLogs() {
        if (mode === "RECENT") {
            await loadRecentLogs();
            return;
        }

        if (mode === "SERVICE_KEY_HISTORY") {
            await loadServiceLogsByServiceKey(serviceKey.trim());
            return;
        }

        if (mode === "SERVICE_ID_HISTORY") {
            await loadServiceLogsByServiceId(Number(monitoredServiceId));
            return;
        }

        if (mode === "AGENT_ERRORS") {
            await loadAgentErrorLogs(Number(agentId));
        }
    }

    function formatDate(value: string) {
        return new Date(value).toLocaleString();
    }

    function formatError(errorMessage: string | null | undefined) {
        return errorMessage && errorMessage.trim() !== "" ? errorMessage : "-";
    }

    if (loading) {
        return <p>Loading logs...</p>;
    }

    if (error) {
        return <p>Error loading logs: {error}</p>;
    }

    return (
        <main className="LogsPage">
            <header className="page-header">
                <div>
                    <h1>Check Logs</h1>
                    <p>Recent check results and filtered log history.</p>
                </div>
            </header>

            <section className="logs-control-panel">
                <div className="logs-control-row">
                    <select
                        className="status-filter"
                        value={mode}
                        onChange={(event) => setMode(event.target.value as LogMode)}>
                        <option value="RECENT">Latest 50 logs</option>
                        <option value="SERVICE_KEY_HISTORY">Service history by key</option>
                        <option value="SERVICE_ID_HISTORY">Service history by ID</option>
                        <option value="AGENT_ERRORS">Agent errors</option>
                    </select>

                    {mode === "SERVICE_KEY_HISTORY" && (
                        <input
                            className="search-input compact-input"
                            type="text"
                            placeholder="Service key"
                            value={serviceKey}
                            onChange={(event) => setServiceKey(event.target.value)}
                        />
                    )}

                    {mode === "SERVICE_ID_HISTORY" && (
                        <input
                            className="search-input compact-input"
                            type="text"
                            inputMode="numeric"
                            placeholder="Service ID"
                            value={monitoredServiceId}
                            onChange={(event) => setMonitoredServiceId(event.target.value)}
                        />
                    )}

                    {mode === "AGENT_ERRORS" && (
                        <input
                            className="search-input compact-input"
                            type="text"
                            inputMode="numeric"
                            placeholder="Agent ID"
                            value={agentId}
                            onChange={(event) => setAgentId(event.target.value)}
                        />
                    )}

                    <button
                        className="primary-button"
                        type="button"
                        onClick={handleLoadLogs}>
                        Load Logs
                    </button>
                </div>

                <div className="logs-control-row">
                    <input
                        className="search-input logs-search-input"
                        type="text"
                        placeholder="Search loaded logs..."
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                    />

                    <select
                        className="status-filter"
                        value={statusFilter}
                        onChange={(event) => setStatusFilter(event.target.value as StatusFilter)}>
                        <option value="ALL">All statuses</option>
                        <option value="UP">UP</option>
                        <option value="DOWN">DOWN</option>
                        <option value="UNKNOWN">UNKNOWN</option>
                    </select>

                    <span className="results-count">
                        {filteredLogs.length} result{filteredLogs.length === 1 ? "" : "s"}
                    </span>
                </div>
            </section>

            <section className="logs-table-section">
                <table>
                    <thead>
                    <tr>
                        <th>Service</th>
                        <th>Service Key</th>
                        <th>Status</th>
                        <th>HTTP Status</th>
                        <th>Latency</th>
                        <th>Error</th>
                        <th>Checked At</th>
                        <th>Received At</th>
                    </tr>
                    </thead>

                    <tbody>
                    {filteredLogs.map((log) => (
                        <tr key={log.id}>
                            <td>
                                <Link
                                    className="table-link"
                                    to={`/services/${encodeURIComponent(log.serviceKey)}`}>
                                    {log.serviceName}
                                </Link>
                            </td>
                            <td>{log.serviceKey}</td>
                            <td>
                                <span className={log.status === "UP" ? "status-up" : "status-down"}>
                                    {log.status}
                                </span>
                            </td>
                            <td>{log.httpStatusCode ?? "-"}</td>
                            <td>{log.latencyMs} ms</td>
                            <td>{formatError(log.errorMessage)}</td>
                            <td>{formatDate(log.checkedAt)}</td>
                            <td>{formatDate(log.receivedAt)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </section>
        </main>
    );

}