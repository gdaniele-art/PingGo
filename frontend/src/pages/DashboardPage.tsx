import { useServices } from "../hooks/useServices.ts";
import { useAgents } from "../hooks/useAgents.ts";
import { useLogs } from "../hooks/useLogs.ts";

import { MetricsSummary } from "../components/MetricsSummary.tsx";
import { ServicesSummary } from "../components/ServicesSummary.tsx";
import { AgentsSummary } from "../components/AgentsSummary.tsx";
import { RecentLogs } from "../components/RecentCheckLogs.tsx";

export function DashboardPage() {
    const {
        data: services,
        loading: servicesLoading,
        error: servicesError,
    } = useServices();

    const {
        data: agents,
        loading: agentsLoading,
        error: agentsError,
    } = useAgents();

    const {
        data: logs,
        loading: logsLoading,
        error: logsError,
    } = useLogs();

    const isLoading = servicesLoading || agentsLoading || logsLoading;
    const error = servicesError || agentsError || logsError;

    if (isLoading) {
        return <p>Loading dashboard...</p>;
    }

    if (error) {
        return <p>Error loading dashboard: {error}</p>;
    }
    return (
        <main className="DashboardPage">
            <h1 className="dashboard-title">PingGo Dashboard</h1>

            <MetricsSummary
                services={services}
                agents={agents}
            />

            <div className="dashboard-summary-grid">
                <ServicesSummary
                    services={services}
                    maxItems={5}
                />

                <AgentsSummary
                    agents={agents}
                    services={services}
                    maxItems={3}
                    maxServiceNames={3}
                />
            </div>

            <RecentLogs logs={logs}/>
        </main>
    );
}