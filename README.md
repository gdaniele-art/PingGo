<a id="readme-top"></a>

<div align="center">
  <img src="https://github.com/user-attachments/assets/d03d413f-e385-4cbd-9319-d27ae1c5cdd6" alt="PingGo Logo" width="700"/>

  <h1 align="center">PingGo</h1>

  <p align="center">
    PingGo is an internal service monitoring system built with a Go agent, Spring Boot API, and React dashboard.
    <br />
    <strong>Keep an eye on your private services — no public exposure, just a lightweight Go binary inside your network.</strong>
  </p>
</div>
<br />
<br />
<br />



## About The Project

<div align="center">
  IMAGE COMING SOON
</div>

<br />

**PingGo** started from a simple frustration: most monitoring tools assume your services are public. If you're running internal APIs, databases, or private infrastructure, you're kind of on your own.

So PingGo takes a different approach. A lightweight **Go agent** lives inside your private network, periodically checking your services via TCP or HTTP GET, measuring latency, catching failures, and reporting everything back to a central **Spring Boot API**. From there, a **React dashboard** gives you a clear view of your agents, monitored services, current status, response times, and recent check history.

No exposure required. No complex setup. Just drop the binary, point it at your services, and let it run.

## Built With

PingGo is built with a backend, an agent, and a frontend dashboard.

### Backend

- Java
- Spring Boot
- Spring Web
- Spring Data JPA
- Maven
- H2 for local development
- PostgreSQL planned for production

### Agent

- Go
- Goroutines
- Cobra CLI
- YAML configuration
- HTTP/TCP health checks

### Frontend

- React
- TypeScript
- Vite
- React Router
- CSS

## Core Features

### Agents

- Create monitoring agents
- List all agents
- Search agents
- View individual agent details
- Enable and disable agents
- View services assigned to an agent

### Monitored Services

- Create monitored services
- Assign services to agents
- List all monitored services
- Search services
- Enable and disable services
- View service status
- Track latency and HTTP status code
- View service details

### Check Logs

- Receive check results from the Go agent
- Store status, latency, HTTP code, error message, and timestamp
- Display recent logs in the dashboard
- Display service-specific logs

### Go Agent

- Load configuration
- Fetch assigned services
- Run service checks periodically
- Execute checks concurrently using goroutines
- Report results to the backend API


## Getting Started
