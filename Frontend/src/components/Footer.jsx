import React from 'react'
import { NavLink } from 'react-router-dom'

function Footer() {
    return (
        <footer className="w-full bg-gradient-to-r from-purple-600 to-blue-500 shadow-md mt-auto">
            <hr className="bg-yellow-400 border-none h-[2px]" />
            <div className="max-w-7xl mx-auto px-4">
                <ul className="flex flex-wrap justify-center items-center gap-6 text-white text-sm font-medium py-3">
                    <NavLink to="/write" className="hover:text-yellow-300 transition-colors">Write</NavLink>
                    <NavLink to="/about" className="hover:text-yellow-300 transition-colors">About</NavLink>
                    <NavLink to="/login" className="hover:text-yellow-300 transition-colors">Log in</NavLink>
                    <NavLink to="/sign_up" className="hover:text-yellow-300 transition-colors">Sign up</NavLink>
                    <NavLink to="/stories" className="hover:text-yellow-300 transition-colors">Stories</NavLink>
                </ul>
            </div>
        </footer>
    )
}

export default Footer;
