import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DashboardPage } from "./pages/DashboardPage.tsx";
import { ServicesPage } from "./pages/ServicesPage.tsx";
import { Navbar } from "./components/Navbar.tsx";
import {AgentsPage} from "./pages/AgentsPage.tsx";
import {AgentDetailPage} from "./pages/AgentDetailPage.tsx";
import {ServiceDetailPage} from "./pages/ServiceDetailPage.tsx";
import { LogsPage } from "./pages/LogsPage.tsx";

export default function App() {
  return (
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:serviceKey" element={<ServiceDetailPage/>}/>
          <Route path="/agents" element={<AgentsPage />} />
          <Route path="/agents/:agentId" element={<AgentDetailPage />} />
          <Route path="/logs" element={<LogsPage />} />
        </Routes>
      </BrowserRouter>
  );
}