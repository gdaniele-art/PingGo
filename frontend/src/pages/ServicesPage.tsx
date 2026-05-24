import { useMemo, useState } from "react";
import { useServices } from "../hooks/useServices.ts";
import { ServicesTable } from "../components/ServicesTable.tsx";
import { AddServiceForm } from "../components/AddServiceForm.tsx";

export function ServicesPage() {
    const {
        data: services,
        loading,
        error,
        addService,
        creating,
    } = useServices();

    const [searchTerm, setSearchTerm] = useState<string>("");
    const [showForm, setShowForm] = useState<boolean>(false);

    const filteredServices = useMemo(() => {
        const normalizedSearch = searchTerm.trim().toLowerCase();

        if (normalizedSearch === "") {
            return services;
        }

        return services.filter((service) =>
            service.name.toLowerCase().includes(normalizedSearch) ||
            service.serviceKey.toLowerCase().includes(normalizedSearch) ||
            service.url.toLowerCase().includes(normalizedSearch) ||
            service.agentName.toLowerCase().includes(normalizedSearch) ||
            service.checkMethod.toLowerCase().includes(normalizedSearch)
        );
    }, [services, searchTerm]);

    if (loading) {
        return <p>Loading services...</p>;
    }

    if (error) {
        return <p>Error loading services: {error}</p>;
    }

    return (
        <main className="ServicesPage">
            <header className="page-header">
                <div>
                    <h1>Monitored Services</h1>
                    <p>Full list of services currently monitored by PingGo.</p>
                </div>

                <button
                    className="primary-button"
                    type="button"
                    onClick={() => setShowForm((prev) => !prev)}
                    disabled={creating}>
                    {showForm ? "Cancel" : "Add Service"}
                </button>
            </header>

            {showForm && (
                <section className="add-service-section">
                    <AddServiceForm
                        addService={async (payload) => {
                            await addService(payload);
                            setShowForm(false);
                        }}/>
                </section>
            )}

            <section className="page-toolbar">
                <input
                    className="search-input"
                    type="text"
                    placeholder="Search by name, service key, URL, agent or method..."
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}/>

                <span className="results-count">
                    {filteredServices.length} result{filteredServices.length === 1 ? "" : "s"}
                </span>
            </section>

            <ServicesTable services={filteredServices} />
        </main>
    );
}