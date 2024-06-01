import { NavLink } from "react-router-dom";

export default function MainNavigation() {

    return (
        <div className="main-navigation">
            <NavLink to="/" className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}>Home</NavLink>
            <NavLink to="/reviews" className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}>Reviews</NavLink>
            <NavLink to="/login" className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}>Login</NavLink>
            <NavLink to="/register" className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}>Register</NavLink>
        </div>
    );
}