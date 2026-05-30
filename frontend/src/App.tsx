import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DashboardPage } from "./pages/DashboardPage.tsx";
import { ServicesPage } from "./pages/ServicesPage.tsx";
import { Navbar } from "./components/Navbar.tsx";
import {AgentsPage} from "./pages/AgentsPage.tsx";
import {AgentDetailPage} from "./pages/AgentDetailPage.tsx";
import {ServiceDetailPage} from "./pages/ServiceDetailPage.tsx";
import { LogsPage } from "./pages/LogsPage.tsx";
import { LoginPage } from "./pages/LoginPage.tsx";
import { ProtectedRoute } from "./components/ProtectedRoute.tsx";

export default function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={
                    <ProtectedRoute allowedRoles={["ADMIN", "VIEWER"]}>
                        <DashboardPage />
                    </ProtectedRoute>
                } />
                <Route path="/services" element={
                    <ProtectedRoute allowedRoles={["ADMIN", "VIEWER"]}>
                        <ServicesPage />
                    </ProtectedRoute>
                } />
                <Route path="/services/:serviceKey" element={
                    <ProtectedRoute allowedRoles={["ADMIN", "VIEWER"]}>
                        <ServiceDetailPage/>
                    </ProtectedRoute>
                } />
                <Route path="/agents" element={
                    <ProtectedRoute allowedRoles={["ADMIN", "VIEWER"]}>
                        <AgentsPage />
                    </ProtectedRoute>
                } />
                <Route path="/agents/:agentId" element={
                    <ProtectedRoute allowedRoles={["ADMIN", "VIEWER"]}>
                        <AgentDetailPage />
                    </ProtectedRoute>
                } />
                <Route path="/logs" element={
                    <ProtectedRoute allowedRoles={["ADMIN", "VIEWER"]}>
                        <LogsPage />
                    </ProtectedRoute>
                } />
            </Routes>
        </BrowserRouter>
    );
}