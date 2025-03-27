import React from "react";
import { FaUser } from 'react-icons/fa';

function Navbar({ user, toggle, iumo, handle, avisos, isP }) {
    if (isP == true) {
        return (
            <nav className="navbar">
                <span>Bem-vindo {user}!</span>
                <div className="nav-icons">
                    <FaUser className="user-icon" onClick={toggle} />
                    {iumo && (
                        <div className="custom-menu">
                            <ul>
                                <li onClick={handle}>Logout</li>
                            </ul>
                        </div>
                    )}
                </div>
            </nav>
        );
    }
    else {
        return (
            <nav className="navbar">
                <span>Bem-vindo {user}!</span>
                <div className="nav-icons">
                    <FaUser className="user-icon" onClick={toggle} />
                    {iumo && (
                        <div className="custom-menu">
                            <ul>
                                <li onClick={avisos}>Avisos</li>
                                <li onClick={handle}>Logout</li>
                            </ul>
                        </div>
                    )}
                </div>
            </nav>
        );
    }
};

export default Navbar;