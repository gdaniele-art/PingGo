import {useAgents} from "../hooks/useAgents.ts";
import {AgentTable} from "../components/AgentTable.tsx";
import {useServices} from "../hooks/useServices.ts";

export function AgentsPage(){
    const {
        data: agents,
            loading: agentsLoading,
            error: agentsError,
    } = useAgents();

    const {
        data: services,
        loading: servicesLoading,
        error: servicesError,
    } = useServices();

    const loading = agentsLoading || servicesLoading;
    const error = agentsError || servicesError;

    if(loading){
        return <p>Loading agents...</p>;
    }
    if(error){
        return <p>Error loading agents: {error}</p>;
    }
    return (
        <main className="AgentsPage">
            <h1>Agents</h1>
            <p>List of agents currently connected to PingGo.</p>
            <AgentTable agents={agents ?? []} services={services ?? []}/>
        </main>
    );
}