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

export type AgentResponse = {
    id: number;
    name: string;
    description: string;
    enabled: boolean;
    servicesCount: number;
    services: MonitoredServiceResponse[];
};

export type CheckLogResponse = {
    id: number;
    monitoredServiceId: number;
    serviceKey: string;
    serviceName: string;
    status: ServiceStatus;
    httpStatusCode: number;
    latency: number;
    error: string;
    checkedAt: string;
    revicedAt: string;
}