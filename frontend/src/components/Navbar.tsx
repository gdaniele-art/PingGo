import { NavLink } from "react-router-dom";

export function Navbar() {
    return (
        <nav className="Navbar">
            <NavLink to="/">Dashboard</NavLink>
            <NavLink to="/services">Services</NavLink>
            <NavLink to="/agents">Agents</NavLink>
            <NavLink to="/logs">Logs</NavLink>
        </nav>
    );
}