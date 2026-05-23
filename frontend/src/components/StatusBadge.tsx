type StatusBadgeProps = {
    value: string | boolean;
};

export function StatusBadge({ value }: StatusBadgeProps) {
    const label =
        typeof value === "boolean"
            ? value ? "ONLINE" : "OFFLINE"
            : value;

    const className = `status-badge status-${label.toLowerCase()}`;

    return (
        <span className={className}>
            {label}
        </span>
    );
}
