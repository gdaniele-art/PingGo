const metrics ={
    totalAgents: 3,
    onlineAgents: 2,
    offlineAgents: 1,
    totalServices: 5
}

export function MetricsSummary() {
    return (
        <section id="metrics-summary">
            <h2>Metrics Summary</h2>

            <div className="metric-grid">
                {
                    Object.entries(metrics).map(([metricName, metricValue]) => (
                        <article key={metricName} className="metric">
                            <p className="metric-name">{metricName}</p>
                            <p className="metric-value">{metricValue}</p>
                        </article>
                    ))

                }
            </div>
        </section>
    );
}