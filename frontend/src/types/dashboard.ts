export type ServiceStatus = "UP"|"DOWN"|"UNKNOWN";
export type agentStatus = "ONLINE"|"OFFLINE"|"UNKNOWN";
export type CheckMethod = "HTTP"|"TCP"|"PING";

export type MonitoredServiceResponse = {
    id: number;
    serviceKey: string;
    name: string;
    url: string;
    checkMethod: CheckMethod;
    enabled: boolean;
    agentId: number;
    agentName: string;
};
