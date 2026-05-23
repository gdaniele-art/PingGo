export type ServiceStatus = "UP"|"DOWN"|"UNKNOWN";
export type agentStatus = "ONLINE"|"OFFLINE"|"UNKNOWN";
export type CheckMethod = "HTTP_GET" | "TCP" | "PING";
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
    latencyMs: number;
    errorMessage: string;
    checkedAt: string;
    receivedAt: string;
};