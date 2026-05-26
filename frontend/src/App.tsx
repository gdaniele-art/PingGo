import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DashboardPage } from "./pages/DashboardPage.tsx";
import { ServicesPage } from "./pages/ServicesPage.tsx";
import { Navbar } from "./components/Navbar.tsx";
import {AgentsPage} from "./pages/AgentsPage.tsx";
import {AgentDetailPage} from "./pages/AgentDetailPage.tsx";

export default function App() {
  return (
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/agents" element={<AgentsPage />} />
          <Route path="agents/:agentId" element={<AgentDetailPage />} />
        </Routes>
      </BrowserRouter>
  );
}