import { NavLink } from "react-router-dom";

export function Navbar() {
    return (
        <nav className="Navbar">
            <NavLink to="/">Dashboard</NavLink>
            <NavLink to="/services">Services</NavLink>
        </nav>
    );
}