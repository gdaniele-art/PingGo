import {AgentTable} from "../components/AgentTable.tsx";
import {MetricsSummary} from "../components/MetricsSummary.tsx";
import {ServicesTable} from "../components/ServicesTable.tsx";
import {RecentLogs} from "../components/RecentCheckLogs.tsx";
import {useDashboardServices} from "../hooks/useDashboardServices.ts";

export  function DashboardPage() {
    const {data: services, loading, error} = useDashboardServices();
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <div className="dashboard-page">
                <h1 className="dashboard-title">PingGo dashboard</h1>
                <p className="dashboard-description">Welcome to the PingGo dashboard.</p>

                <MetricsSummary />
                <div className="tables-container">
                    <ServicesTable services={services}/>
                    <AgentTable />
                </div>
                <RecentLogs />



        </div>
);
}