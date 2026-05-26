import { Link, useParams } from "react-router-dom";
import { useService } from "../hooks/useService.ts";
import { RecentLogs } from "../components/RecentCheckLogs.tsx";

export function ServiceDetailPage() {
    const { serviceKey } = useParams();

    const {
        data: service,
        logs,
        loading,
        updating,
        error,
        toggleServiceStatus,
    } = useService(serviceKey ?? "");

    if (!serviceKey) {
        return <p>Invalid service key</p>;
    }

    if (loading) {
        return <p>Loading service...</p>;
    }

    if (error) {
        return <p>Error loading service: {error}</p>;
    }

    if (!service) {
        return <p>Service not found</p>;
    }

    return (
        <main className="ServiceDetailPage">
            <header className="page-header">
                <div>
                    <h1>{service.name}</h1>
                    <p>{service.url}</p>
                </div>

                <div className="service-actions">
                    <span className={service.enabled ? "status-up" : "status-down"}>
                        {service.enabled ? "Enabled" : "Disabled"}
                    </span>

                    <button
                        className="primary-button"
                        type="button"
                        onClick={toggleServiceStatus}
                        disabled={updating}>
                        {updating
                            ? "Updating..."
                            : service.enabled
                                ? "Disable Service"
                                : "Enable Service"}
                    </button>
                </div>
            </header>

            <section className="service-detail-summary">
                <article className="summary-card">
                    <h2>Service Key</h2>
                    <p>{service.serviceKey}</p>
                </article>

                <article className="summary-card">
                    <h2>Status</h2>
                    <p>{service.enabled ? "Enabled" : "Disabled"}</p>
                </article>

                <article className="summary-card">
                    <h2>Check Method</h2>
                    <p>{service.checkMethod}</p>
                </article>

                <article className="summary-card">
                    <h2>Agent</h2>
                    <p>
                        <Link to={`/agents/${service.agentId}`}>
                            {service.agentName}
                        </Link>
                    </p>
                </article>
            </section>

            <section className="service-logs-section">
                <div className="section-header">
                    <h2>Recent check logs</h2>
                    <p>Latest check results reported for this service.</p>
                </div>

                <RecentLogs logs={logs} />
            </section>
        </main>
    );
}