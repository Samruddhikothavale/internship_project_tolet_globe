import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { IoReorderThreeSharp } from "react-icons/io5";
import React, { useState } from "react";

export const Navbar=()=>{
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

    return<>
        <header>
            <div className="container">
                <div className="logo-brand">
                    <NavLink to="/" >Tolet Globe</NavLink>
                </div>
                <div className="menu-toggle" onClick={toggleMenu}><IoReorderThreeSharp /></div>
                <nav>
                    <ul className={`nav-links ${isMenuOpen ? "show" : ""}`}>
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/about">About</NavLink></li>
                        <li><NavLink to="/blogs">Blogs</NavLink></li>
                        <li><NavLink to="/contact">Contact</NavLink></li>
                        <li><NavLink to="/login">Login</NavLink></li>
                        <li><NavLink to="/register">Register</NavLink></li>
                    </ul>
                </nav>
            </div>
        </header>
    </>
};
