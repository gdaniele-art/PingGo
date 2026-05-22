import {AgentTable} from "../components/AgentTable.tsx";
import {MetricsSummary} from "../components/MetricsSummary.tsx";
import {ServicesTable} from "../components/ServicesTable.tsx";

export  function DashboardPage() {
    return (
        <div className={"Dashboard"}>
                <h1>PingGo dashboard</h1>
                <p>Welcome to the PingGo dashboard.</p>
                <MetricsSummary />
                <AgentTable />
                <ServicesTable />


        </div>
);
}