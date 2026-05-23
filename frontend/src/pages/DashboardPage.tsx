import { useDashboardServices } from "../hooks/useDashboardServices";
import { useDashboardAgents } from "../hooks/useDashboardAgents";
import { MetricsSummary } from "../components/MetricsSummary";
import { ServicesTable } from "../components/ServicesTable";
import { AgentTable } from "../components/AgentTable";
import { RecentLogs } from "../components/RecentCheckLogs";
import {useDashboardLogs} from "../hooks/useDashboardLogs.ts";

export function DashboardPage() {
    const {
        data: services,
        loading: servicesLoading,
        error: servicesError,
    } = useDashboardServices();

    const {
        data: agents,
        loading: agentsLoading,
        error: agentsError,
    } = useDashboardAgents();

    const {
        data: logs,
        loading: logsLoading,
        error: logsError,
    } = useDashboardLogs();

    const isLoading = servicesLoading || agentsLoading || logsLoading;
    const error = servicesError || agentsError || logsError;

    if (isLoading) {
        return <p>Loading dashboard...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="dashboard-page">
            <h1 className="dashboard-title">PingGo dashboard</h1>
            <p className="dashboard-description">
                Welcome to the PingGo dashboard.
            </p>

            <MetricsSummary services={services} agents={agents} />

            <div className="tables-container">
                <ServicesTable services={services} />
                <AgentTable agents={agents} services={services} />
            </div>

            <RecentLogs logsData ={logs} />
        </div>
    );
}