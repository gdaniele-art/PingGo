export function formatDateTime(value: string | null | undefined): string {
    if (!value) {
        return "-";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return value;
    }

    return date.toLocaleString();
}

export function formatErrorMessage(value: string | null | undefined): string {
    if (!value || value.trim() === "") {
        return "-";
    }

    return value;
}