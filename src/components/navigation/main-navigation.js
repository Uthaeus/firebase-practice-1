import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";

import { UserContext } from "../../store/user-context";

export default function MainNavigation() {

    const { user, logout } = useContext(UserContext);

    const navigate = useNavigate();

    const logoutHandler = () => {
        logout();
        navigate('/');
    }

    return (
        <div className="main-navigation">
            <NavLink to="/" className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}>Home</NavLink>
            <NavLink to="/reviews" className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}>Reviews</NavLink>
            

            { user ? (
                <>
                    <NavLink to="/edit-profile" className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}>Edit Profile</NavLink>
                    <p className="nav-link" onClick={logoutHandler}>Logout</p>
                </>
            ) : (
                <>
                    <NavLink to="/login" className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}>Login</NavLink>
                    <NavLink to="/register" className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}>Register</NavLink>
                </>
            )}
        </div>
    );
}