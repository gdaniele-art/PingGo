import {AgentTable} from "../components/AgentTable.tsx";
import {MetricsSummary} from "../components/MetricsSummary.tsx";
import {ServicesTable} from "../components/ServicesTable.tsx";
import {RecentLogs} from "../components/RecentCheckLogs.tsx";

export  function DashboardPage() {
    return (
        <div className="dashboard-page">
                <h1 className="dashboard-title">PingGo dashboard</h1>
                <p className="dashboard-description">Welcome to the PingGo dashboard.</p>

                <MetricsSummary />
                <div className="tables-container">
                    <ServicesTable />
                    <AgentTable />
                </div>
                <RecentLogs />



        </div>
);
}