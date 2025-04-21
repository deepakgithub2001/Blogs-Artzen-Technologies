import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // hamburger and close icons

function NavBar() {
    const [user, setUser] = useState();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className="bg-gradient-to-r from-purple-600 to-blue-500 p-4 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <NavLink to="/">
                    <h1 className="text-3xl text-white font-serif">WRITE</h1>
                </NavLink>

                {/* Hamburger Icon */}
                <div className="md:hidden text-white" onClick={toggleMenu}>
                    {menuOpen ? <X size={28} /> : <Menu size={28} />}
                </div>

                {/* Desktop Menu */}
                <ul className="hidden md:flex gap-5 text-white font-serif">
                    <NavLink to="/write">
                        <li className="cursor-pointer bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-300">Write</li>
                    </NavLink>
                    <NavLink to="/about">
                        <li className="cursor-pointer bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-300">About</li>
                    </NavLink>

                    {!token ? (
                        <>
                            <NavLink to="/login">
                                <li className="cursor-pointer bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-300">Log in</li>
                            </NavLink>
                            <NavLink to="/sign_up">
                                <li className="cursor-pointer bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-300">Sign up</li>
                            </NavLink>
                        </>
                    ) : (
                        <>
                            <NavLink to="/stories">
                                <li className="cursor-pointer bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-300">Stories</li>
                            </NavLink>
                            <li
                                onClick={handleLogout}
                                className="cursor-pointer bg-red-500 px-3 py-1 rounded hover:bg-red-400"
                            >
                                Logout
                            </li>
                        </>
                    )}
                </ul>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <ul className="md:hidden mt-4 flex flex-col gap-3 text-white font-serif">
                    <NavLink to="/write" onClick={() => setMenuOpen(false)}>
                        <li className="cursor-pointer bg-yellow-400 px-4 py-2 rounded hover:bg-yellow-300">Write</li>
                    </NavLink>
                    <NavLink to="/about" onClick={() => setMenuOpen(false)}>
                        <li className="cursor-pointer bg-yellow-400 px-4 py-2 rounded hover:bg-yellow-300">About</li>
                    </NavLink>

                    {!user ? (
                        <>
                            <NavLink to="/login" onClick={() => setMenuOpen(false)}>
                                <li className="cursor-pointer bg-yellow-400 px-4 py-2 rounded hover:bg-yellow-300">Log in</li>
                            </NavLink>
                            <NavLink to="/sign_up" onClick={() => setMenuOpen(false)}>
                                <li className="cursor-pointer bg-yellow-400 px-4 py-2 rounded hover:bg-yellow-300">Sign up</li>
                            </NavLink>
                        </>
                    ) : (
                        <>
                            <NavLink to="/stories" onClick={() => setMenuOpen(false)}>
                                <li className="cursor-pointer bg-yellow-400 px-4 py-2 rounded hover:bg-yellow-300">Stories</li>
                            </NavLink>
                            <li
                                onClick={() => {
                                    handleLogout();
                                    setMenuOpen(false);
                                }}
                                className="cursor-pointer bg-red-500 px-4 py-2 rounded hover:bg-red-400"
                            >
                                Logout
                            </li>
                        </>
                    )}
                </ul>
            )}
        </nav>
    );
}

export default NavBar;
