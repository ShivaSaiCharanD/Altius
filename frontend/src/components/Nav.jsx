import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function NavBar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);


    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
            <Link className="navbar-brand" to="/">MyApp</Link>

            <div className="collapse navbar-collapse">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    {isLoggedIn ? (
                        <li className="nav-item">
                            <Link className="nav-link" onClick={handleLogout} to="/login">Logout</Link>
                        </li>
                    ) : (
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                    )}
                    {!isLoggedIn && (
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
}
