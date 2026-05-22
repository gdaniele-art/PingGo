type StatusBadgeProps = {
    status: "UP" | "DOWN" | "ONLINE" | "OFFLINE";
};

export function StatusBadge({ status }: StatusBadgeProps) {
    const isHealthy = status === "UP" || status === "ONLINE";

    const className = isHealthy
        ? "status-badge status-badge-ok"
        : "status-badge status-badge-error";

    return <span className={className}>{status}</span>;
}