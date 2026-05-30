import { NavLink } from "react-router-dom";
import { useAuth } from "../auth/useAuth.ts";


export function Navbar() {
    const { isAuthenticated, session, logout } = useAuth();

    if (!isAuthenticated) {
        return null;
    }
    return (
        <nav className="Navbar">
            <NavLink to="/">Dashboard</NavLink>
            <NavLink to="/services">Services</NavLink>
            <NavLink to="/agents">Agents</NavLink>
            <NavLink to="/logs">Logs</NavLink>

            <div className="navbar-session">
                <span>{session?.email}</span>
                <span className="role-pill">{session?.roles.join(", ")}</span>
                <button type="button" onClick={logout}>Logout</button>
            </div>
        </nav>
    );
}